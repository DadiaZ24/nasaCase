# ═══════════════════════════════════════════════════════════════
#  NASA Mission Control — ARES-VII Dashboard
#  Imagem única: PostgreSQL 16 + API Express + frontend estático
#  Tudo servido em http://localhost:3001
# ═══════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────
#  Etapa 1 — Build do frontend (React + Vite)
# ─────────────────────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /build

# URLs da API embebidas no bundle em tempo de build.
# Por omissão ficam vazias e o frontend usa o fallback http://localhost:3001
# (ver frontend/src/services/api.js), que é exatamente onde a API corre nesta
# imagem. Só é preciso passar --build-arg se servires noutro host/porta.
ARG VITE_API_URL
ARG VITE_WS_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_URL=$VITE_WS_URL

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


# ─────────────────────────────────────────────
#  Etapa 2 — Runtime (Postgres + Node)
# ─────────────────────────────────────────────
FROM node:20-alpine

# postgresql16 → servidor; su-exec → baixar privilégios para o utilizador postgres
RUN apk add --no-cache postgresql16 postgresql16-client su-exec

# ─── Base de dados ───
ENV PGDATA=/var/lib/postgresql/data \
    POSTGRES_USER=nasa \
    POSTGRES_PASSWORD=mission_control_2035 \
    POSTGRES_DB=nasa_mission

# ─── Backend ───
# O Postgres corre no mesmo container, por isso o host é 127.0.0.1
ENV NODE_ENV=production \
    PORT=3001 \
    DATABASE_URL=postgresql://nasa:mission_control_2035@127.0.0.1:5432/nasa_mission?schema=public \
    CORS_ORIGIN=*

# Volta a semear a base de dados em cada arranque (apaga o estado da missão).
# Por omissão o seed só corre na primeira inicialização.
ENV SEED_ON_START=false

WORKDIR /app

# Dependências primeiro, para aproveitar a cache do Docker.
# Instalamos também as devDependencies: o CLI do Prisma é necessário em runtime
# para o `migrate deploy` e o `db seed` feitos pelo entrypoint.
COPY backend/package*.json ./
RUN npm install

COPY backend/prisma ./prisma
RUN npx prisma generate

COPY backend/ ./

# Bundle do frontend servido estaticamente pelo Express (ver server.js)
COPY --from=frontend-build /build/dist ./public

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && mkdir -p "$PGDATA" /run/postgresql \
    && chown -R postgres:postgres "$PGDATA" /run/postgresql

# Persistir os dados da missão entre execuções:
#   docker run -v nasa_data:/var/lib/postgresql/data ...
VOLUME ["/var/lib/postgresql/data"]

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
