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
| Containerização | Docker, Docker Compose |
| Reverse Proxy | Nginx (produção) |

## 📦 Pré-requisitos

- [Docker](https://www.docker.com/get-started) (v20+)
- [Docker Compose](https://docs.docker.com/compose/) (v2+)

## 🚀 Instalação e Execução

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd nasa-mission-control

# 2. Copiar variáveis de ambiente
cp .env.example .env

# 3. Construir e iniciar todos os serviços
docker compose up --build

# 4. Abrir no browser
# Frontend: http://localhost:5173
# API:      http://localhost:3001/api/mission
```

Para parar:
```bash
docker compose down
```

Para parar e apagar dados:
```bash
docker compose down -v
```

## 📁 Estrutura do Projeto

```
nasa-mission-control/
├── docker-compose.yml
├── .env / .env.example
├── frontend/          ← React + Vite
│   ├── Dockerfile
│   ├── src/
│   │   ├── components/   (Layout, MissionOverview, SystemStatus, Crew, Alerts, Energy, Weather, Common)
│   │   ├── hooks/        (useSocket, useMission, useAlerts)
│   │   ├── services/     (api.js, socket.js)
│   │   └── context/      (ThemeContext)
│   └── public/
├── backend/           ← Node.js + Express
│   ├── Dockerfile
│   ├── prisma/        (schema + seed)
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/     (simulationService, decisionService)
│       ├── sockets/
│       └── middleware/
└── nginx/             ← Reverse Proxy (produção)
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
