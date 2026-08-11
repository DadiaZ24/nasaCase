#!/bin/sh
# ═══════════════════════════════════════════════════════════════
#  Arranque do container único:
#    1. inicializa o cluster PostgreSQL (só na primeira vez)
#    2. arranca o PostgreSQL em segundo plano
#    3. aplica migrações Prisma e, se necessário, o seed
#    4. entrega o controlo ao servidor Node
# ═══════════════════════════════════════════════════════════════
set -e

PGDATA="${PGDATA:-/var/lib/postgresql/data}"
FIRST_RUN=0

# ─── 1. Inicializar o cluster, se ainda não existir ───
# Num volume montado, o PG_VERSION só existe a partir da segunda execução.
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "▶ Primeira execução — a inicializar o cluster PostgreSQL..."
  su-exec postgres initdb \
    --username=postgres \
    --encoding=UTF8 \
    --auth-local=trust \
    --auth-host=scram-sha-256 \
    -D "$PGDATA" >/dev/null
  # Só aceita ligações de dentro do próprio container
  echo "listen_addresses = '127.0.0.1'" >>"$PGDATA/postgresql.conf"
  FIRST_RUN=1
fi

# ─── 2. Arrancar o PostgreSQL ───
echo "▶ A arrancar o PostgreSQL..."
su-exec postgres pg_ctl -D "$PGDATA" -w -t 60 -l /tmp/postgres.log start

# ─── 3. Criar utilizador e base de dados da aplicação ───
if [ "$FIRST_RUN" = "1" ]; then
  echo "▶ A criar o utilizador '$POSTGRES_USER' e a base de dados '$POSTGRES_DB'..."
  su-exec postgres psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres <<-EOSQL
    CREATE USER "$POSTGRES_USER" WITH PASSWORD '$POSTGRES_PASSWORD';
    CREATE DATABASE "$POSTGRES_DB" OWNER "$POSTGRES_USER";
EOSQL
fi

# ─── 4. Migrações e seed ───
echo "▶ A aplicar migrações Prisma..."
npx prisma migrate deploy

# O seed apaga todas as tabelas antes de as recriar, por isso só corre na
# primeira execução — caso contrário perder-se-ia o estado da missão a cada
# reinício. Força-o com -e SEED_ON_START=true.
if [ "$FIRST_RUN" = "1" ] || [ "$SEED_ON_START" = "true" ]; then
  echo "▶ A semear a base de dados..."
  npx prisma db seed
else
  echo "▶ Seed ignorado (base de dados já inicializada)."
fi

# ─── 5. Arrancar a aplicação ───
# Corre em segundo plano para podermos desligar o PostgreSQL de forma limpa
# quando o container receber SIGTERM (docker stop).
echo "▶ Mission Control pronto → http://localhost:${PORT:-3001}"
"$@" &
APP_PID=$!

shutdown() {
  echo "▶ A encerrar..."
  kill -TERM "$APP_PID" 2>/dev/null || true
  wait "$APP_PID" 2>/dev/null || true
  su-exec postgres pg_ctl -D "$PGDATA" -m fast -w stop || true
  exit 0
}
trap shutdown TERM INT

wait "$APP_PID"
EXIT_CODE=$?

# Se o Node morrer sozinho, desliga o PostgreSQL antes de sair.
su-exec postgres pg_ctl -D "$PGDATA" -m fast -w stop || true
exit "$EXIT_CODE"
