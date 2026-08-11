import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let ioInstance = null;

export const setDecisionIo = (io) => {
  ioInstance = io;
};

/**
 * Mapeamento de ações possíveis por código de alerta
 * Cada ação tem consequências que afetam outros sistemas
 */
const ALERT_ACTIONS = {
  'ALT-042': {
    // Tempestade Solar
    'Ativar protocolo de proteção': async (missionId) => {
      // Escudo de Radiação sobe para 95%
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Escudo de Radiação' },
        data: { level: 95, status: 'normal', observation: 'Protocolo de proteção ativado' },
      });
      return 'Escudo de Radiação reforçado para 95%. Tripulação protegida.';
    },
    'Ignorar': async (missionId) => {
      // Radiação cósmica sobe, saúde degrada
      const weather = await prisma.spaceWeather.findFirst({
        where: { missionId },
        orderBy: { recordedAt: 'desc' },
      });
      if (weather) {
        await prisma.spaceWeather.update({
          where: { id: weather.id },
          data: { cosmicRadiation: weather.cosmicRadiation * 1.5 },
        });
      }
      // Degradar saúde da tripulação
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'excellent' },
        data: { healthStatus: 'good' },
      });
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'good' },
        data: { healthStatus: 'fatigue' },
      });
      return '⚠️ Radiação aumentou 50%. Saúde da tripulação degradou.';
    },
    'Recolher painéis solares': async (missionId) => {
      // Energia Solar desce para 40%, Escudo sobe para 90%
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Energia Solar' },
        data: { level: 40, status: 'warning', observation: 'Painéis recolhidos — proteção contra tempestade' },
      });
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Escudo de Radiação' },
        data: { level: 90, status: 'normal', observation: 'Proteção reforçada com painéis recolhidos' },
      });
      return 'Painéis solares recolhidos. Energia a 40%, Escudo a 90%.';
    },
  },

  'ALT-039': {
    // Filtro CO₂
    'Substituir filtro': async (missionId) => {
      // CO₂ sobe para 95%, tarefa da Eng. Patel muda
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Suporte de Vida (CO₂)' },
        data: { level: 95, status: 'normal', observation: 'Filtro substituído com sucesso' },
      });
      await prisma.crewMember.updateMany({
        where: { missionId, name: 'Eng. Priya Patel' },
        data: { currentTask: 'Descanso pós-reparação' },
      });
      return 'Filtro de CO₂ substituído. Sistema a 95%. Eng. Patel em descanso.';
    },
    'Reparação temporária': async (missionId) => {
      // CO₂ sobe para 80%, mas nota na observação
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Suporte de Vida (CO₂)' },
        data: { level: 80, status: 'warning', observation: 'Reparação temporária — degradação 2x mais rápida' },
      });
      return 'Reparação temporária efetuada. CO₂ a 80%, mas degradará mais rapidamente.';
    },
    'Usar reserva de O₂': async (missionId) => {
      // O₂ desce 10%, CO₂ mantém
      const o2System = await prisma.shipSystem.findFirst({
        where: { missionId, name: 'Suporte de Vida (O₂)' },
      });
      if (o2System) {
        await prisma.shipSystem.update({
          where: { id: o2System.id },
          data: { level: o2System.level - 10, observation: 'Reserva de O₂ em uso — nível reduzido' },
        });
      }
      return 'Reserva de O₂ ativada. O₂ desceu 10%, CO₂ estabilizado temporariamente.';
    },
  },

  'ALT-041': {
    // Energia Negativa
    'Reduzir consumo': async (missionId) => {
      // Simular redução de consumo
      await prisma.missionLogEntry.create({
        data: {
          type: 'action',
          message: 'Sistemas não-essenciais desligados. Consumo reduzido em 15%.',
          source: 'system',
          missionId,
        },
      });
      return 'Consumo não-essencial reduzido em 15%. Alguns sistemas em modo eco.';
    },
    'Reorientar painéis': async (missionId) => {
      // Geração sobe, navegação desce
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Energia Solar' },
        data: { level: 95, observation: 'Painéis reorientados para máxima captação' },
      });
      await prisma.shipSystem.updateMany({
        where: { missionId, name: 'Sistema de Navegação' },
        data: { level: 90, observation: 'Ligeira interferência pela reorientação dos painéis' },
      });
      return 'Painéis reorientados. Geração +10%, Navegação a 90%.';
    },
    'Ativar reserva': async (missionId) => {
      // Adicionar bónus de energia
      const mission = await prisma.mission.findUnique({ where: { id: missionId } });
      await prisma.energyLog.create({
        data: {
          missionDay: mission.currentDay,
          energyGenerated: 350,
          energyConsumed: 300,
          balance: 50,
          missionId,
        },
      });
      return 'Reserva energética ativada. Bónus de +50 kWh. Solução temporária.';
    },
  },

  'ALT-038': {
    // Fadiga da tripulação
    'Ajustar turnos': async (missionId) => {
      // Horas de sono sobem para os membros com fadiga
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'fatigue' },
        data: { sleepHours: 8.0, healthStatus: 'good', currentTask: 'Período de descanso estendido' },
      });
      return 'Turnos ajustados. Membros com fadiga em descanso estendido.';
    },
    'Administrar estimulantes': async (missionId) => {
      // Fadiga resolve imediatamente, mas saúde degrada a longo prazo
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'fatigue' },
        data: { healthStatus: 'good' },
      });
      await prisma.missionLogEntry.create({
        data: {
          type: 'warning',
          message: '⚠️ Estimulantes administrados. Monitorizar efeitos secundários.',
          source: 'crew',
          missionId,
        },
      });
      return 'Estimulantes administrados. Fadiga resolvida, mas atenção a efeitos secundários.';
    },
    'Redistribuir tarefas': async (missionId) => {
      // Membros com fadiga descansam, outros recebem tarefas extra
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'fatigue' },
        data: { healthStatus: 'good', sleepHours: 7.5, currentTask: 'Período de recuperação' },
      });
      // Atualizar tarefas dos outros
      await prisma.crewMember.updateMany({
        where: { missionId, healthStatus: 'excellent' },
        data: { currentTask: 'Tarefas redistribuídas — carga extra' },
      });
      return 'Tarefas redistribuídas. Membros com fadiga em recuperação.';
    },
  },
};

export const decisionService = {
  /**
   * Resolve um alerta aplicando a ação escolhida e as suas consequências
   */
  resolveAlert: async (alertId, action) => {
    const alert = await prisma.alert.findUnique({ where: { id: alertId } });
    if (!alert) return { error: 'Alerta não encontrado' };
    if (alert.isResolved) return { error: 'Alerta já resolvido' };

    const mission = await prisma.mission.findFirst();
    if (!mission) return { error: 'Missão não encontrada' };

    // Executar a ação e obter consequências
    let consequence = `Ação "${action}" aplicada ao alerta ${alert.code}.`;
    const alertActions = ALERT_ACTIONS[alert.code];

    if (alertActions && alertActions[action]) {
      consequence = await alertActions[action](mission.id);
    }

    // Marcar alerta como resolvido
    const updatedAlert = await prisma.alert.update({
      where: { id: alertId },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
        resolvedAction: action,
      },
    });

    // Registar no log da missão
    const logEntry = await prisma.missionLogEntry.create({
      data: {
        type: 'action',
        message: `Alerta ${alert.code} resolvido: "${action}" — ${consequence}`,
        source: 'ground_control',
        missionId: mission.id,
      },
    });

    // Emitir eventos WebSocket
    if (ioInstance) {
      ioInstance.emit('alert:resolved', updatedAlert);
      ioInstance.emit('log:new', logEntry);

      // Emitir atualizações de sistemas e tripulação afetados
      const systems = await prisma.shipSystem.findMany({ where: { missionId: mission.id } });
      const crew = await prisma.crewMember.findMany({ where: { missionId: mission.id } });
      ioInstance.emit('system:update', systems);
      ioInstance.emit('crew:update', crew);
    }

    return { alert: updatedAlert, consequence };
  },

  /**
   * Retorna as ações disponíveis para um código de alerta
   */
  getAvailableActions: (alertCode) => {
    const actions = ALERT_ACTIONS[alertCode];
    if (!actions) return [];
    return Object.keys(actions);
  },
};
