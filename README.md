# 🚀 NASA Mission Control — ARES-VII Dashboard

> Painel de controlo em tempo real para a missão tripulada ARES-VII a Marte

## 📋 Descrição

O **NASA Mission Control Dashboard** é uma aplicação web full-stack que simula o painel de controlo de uma missão espacial tripulada a Marte. A aplicação permite monitorizar em tempo real o estado da nave, da tripulação, dos sistemas de suporte de vida, condições meteorológicas espaciais e alertas da missão.

Construído como projeto educativo para um workshop de AI e Programação, o dashboard apresenta dados fictícios mas realistas da missão ARES-VII, com funcionalidades interativas como resolução de alertas, simulação temporal e visualização de dados energéticos.

## ✨ Funcionalidades

- 🛸 **Visão geral da missão** — dados em tempo real da viagem (distância, velocidade, dia da missão)
- 📊 **Estado dos sistemas** — monitorização de 10 sistemas da nave com gauges visuais
- 👨‍🚀 **Painel da tripulação** — estado de saúde, horas de sono e tarefas de 6 astronautas
- ⚡ **Gráfico de energia** — histórico de produção vs. consumo energético
- 🌌 **Meteorologia espacial** — radiação, atividade solar, micrometeoritos
- 🚨 **Sistema de alertas** — alertas priorizados com resolução interativa e consequências
- ⏱️ **Simulação temporal** — avanço acelerado da missão com atualização de todos os dados
- 🌙 **Modo escuro/claro** — alternância de tema com persistência
- 📱 **Design responsivo** — desktop, tablet e mobile
- 🔌 **Tempo real** — WebSockets para atualizações instantâneas

## 🛠️ Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18, Vite, Recharts, Socket.IO Client, Lucide Icons |
| Backend | Node.js 20, Express.js, Socket.IO, node-cron |
| Base de Dados | PostgreSQL 16 (Prisma ORM) |
| Containerização | Docker (imagem única) |

## 📦 Pré-requisitos

- [Docker](https://www.docker.com/get-started) (v20+)

## 🚀 Instalação e Execução

Toda a aplicação — PostgreSQL, API e frontend — corre num **único container**.

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd nasa-mission-control

# 2. Construir a imagem
docker build -t nasa-mission-control .

# 3. Arrancar
docker run -d --name nasa \
  -p 3001:3001 \
  -v nasa_data:/var/lib/postgresql/data \
  nasa-mission-control

# 4. Abrir no browser
# Dashboard: http://localhost:3001
# API:       http://localhost:3001/api/mission
```

O arranque inicializa a base de dados, aplica as migrações e semeia os dados
automaticamente. A primeira vez demora alguns segundos — acompanha com
`docker logs -f nasa`.

Para parar e voltar a arrancar (os dados persistem no volume `nasa_data`):
```bash
docker stop nasa
docker start nasa
```

Para remover o container:
```bash
docker rm -f nasa
```

Para apagar também os dados da missão:
```bash
docker volume rm nasa_data
```

### ⚙️ Opções

| Variável / Flag | Efeito |
|---|---|
| `-e SEED_ON_START=true` | Repõe os dados iniciais da missão em cada arranque |
| `-e PORT=8080` | Muda a porta interna da aplicação |
| `-p 8080:3001` | Publica noutra porta do host (ver nota abaixo) |
| `--build-arg VITE_API_URL=...` | Define o URL da API embebido no frontend (build) |

> **Nota:** o frontend é compilado com o URL da API a apontar para
> `http://localhost:3001`. Se publicares noutra porta ou noutro host, tens de
> reconstruir a imagem com o URL correto:
> ```bash
> docker build --build-arg VITE_API_URL=http://localhost:8080 \
>              --build-arg VITE_WS_URL=http://localhost:8080 \
>              -t nasa-mission-control .
> ```

### 🔄 Repor a base de dados

```bash
docker exec nasa npx prisma db seed
```

## 📁 Estrutura do Projeto

```
nasa-mission-control/
├── Dockerfile             ← imagem única (Postgres + API + frontend)
├── docker-entrypoint.sh   ← arranque: BD → migrações → seed → servidor
├── .env / .env.example
├── frontend/          ← React + Vite (compilado para estático)
│   ├── src/
│   │   ├── components/   (Layout, MissionOverview, SystemStatus, Crew, Alerts, Energy, Weather, Common)
│   │   ├── hooks/        (useSocket, useMission, useAlerts)
│   │   ├── services/     (api.js, socket.js)
│   │   └── context/      (ThemeContext)
│   └── public/
└── backend/           ← Node.js + Express (serve a API e o frontend)
    ├── prisma/        (schema + seed)
    └── src/
        ├── routes/
        ├── controllers/
        ├── services/     (simulationService, decisionService)
        ├── sockets/
        └── middleware/
```

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/mission` | Dados gerais da missão |
| GET | `/api/systems` | Estado de todos os sistemas |
| PATCH | `/api/systems/:id` | Atualizar sistema |
| GET | `/api/crew` | Lista da tripulação |
| GET | `/api/alerts` | Alertas ativos |
| PATCH | `/api/alerts/:id/resolve` | Resolver alerta |
| GET | `/api/energy` | Histórico energético |
| GET | `/api/weather` | Meteorologia espacial |
| GET | `/api/log` | Log da missão |
| POST | `/api/simulation/start` | Iniciar simulação |
| POST | `/api/simulation/stop` | Parar simulação |

## 📄 Licença

MIT License — Projeto educativo para workshop de AI e Programação.
