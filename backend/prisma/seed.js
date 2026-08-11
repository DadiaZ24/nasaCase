import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 A iniciar seed da base de dados...');

  // Limpar todas as tabelas (ordem importa por causa das FKs)
  await prisma.missionLogEntry.deleteMany();
  await prisma.spaceWeather.deleteMany();
  await prisma.energyLog.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.crewMember.deleteMany();
  await prisma.shipSystem.deleteMany();
  await prisma.mission.deleteMany();

  console.log('✅ Tabelas limpas');

  // Criar missão principal
  const mission = await prisma.mission.create({
    data: {
      name: 'ARES-VII',
      destination: 'Marte (Cratera Jezero)',
      launchDate: new Date('2035-03-15T00:00:00Z'),
      estimatedDuration: 687,
      currentDay: 142,
      currentPhase: 'Cruzeiro Interplanetário',
      distanceToEarth: 78.3,
      distanceToMars: 143.7,
      currentSpeed: 24800,
      commDelay: 261,
      totalDistance: 222.0,
    },
  });

  console.log(`✅ Missão criada: ${mission.name} (ID: ${mission.id})`);

  // 10 Sistemas da nave
  await prisma.shipSystem.createMany({
    data: [
      {
        name: 'Energia Solar',
        category: 'energy',
        status: 'normal',
        level: 87,
        observation: 'Painéis a funcionar em pleno',
        icon: 'sun',
        missionId: mission.id,
      },
      {
        name: 'Suporte de Vida (O₂)',
        category: 'life_support',
        status: 'normal',
        level: 92,
        observation: 'Níveis dentro do esperado',
        icon: 'wind',
        missionId: mission.id,
      },
      {
        name: 'Suporte de Vida (CO₂)',
        category: 'life_support',
        status: 'warning',
        level: 68,
        observation: 'Filtro de CO₂ com desgaste elevado',
        icon: 'cloud',
        missionId: mission.id,
      },
      {
        name: 'Propulsão Principal',
        category: 'propulsion',
        status: 'normal',
        level: 100,
        observation: 'Em modo hibernação até manobra',
        icon: 'rocket',
        missionId: mission.id,
      },
      {
        name: 'Propulsão Auxiliar',
        category: 'propulsion',
        status: 'normal',
        level: 95,
        observation: 'Correção orbital realizada ontem',
        icon: 'zap',
        missionId: mission.id,
      },
      {
        name: 'Comunicações',
        category: 'communication',
        status: 'normal',
        level: 100,
        observation: 'Ligação estável com Deep Space Network',
        icon: 'radio',
        missionId: mission.id,
      },
      {
        name: 'Escudo de Radiação',
        category: 'protection',
        status: 'warning',
        level: 74,
        observation: 'Tempestade solar prevista em 48h',
        icon: 'shield',
        missionId: mission.id,
      },
      {
        name: 'Reserva de Água',
        category: 'life_support',
        status: 'normal',
        level: 81,
        observation: 'Reciclagem a funcionar a 96.2%',
        icon: 'droplet',
        missionId: mission.id,
      },
      {
        name: 'Computador de Bordo',
        category: 'computing',
        status: 'normal',
        level: 100,
        observation: 'Sem erros no último ciclo',
        icon: 'cpu',
        missionId: mission.id,
      },
      {
        name: 'Sistema de Navegação',
        category: 'navigation',
        status: 'normal',
        level: 98,
        observation: 'Posição confirmada por 3 estrelas',
        icon: 'compass',
        missionId: mission.id,
      },
    ],
  });

  console.log('✅ 10 sistemas da nave criados');

  // 6 Membros da tripulação
  await prisma.crewMember.createMany({
    data: [
      {
        name: 'Cmdr. Helena Sousa',
        role: 'Comandante',
        healthStatus: 'excellent',
        sleepHours: 7.2,
        currentTask: 'Revisão do plano de voo',
        avatarColor: '#4A9DFF',
        missionId: mission.id,
      },
      {
        name: 'Dr. James Chen',
        role: 'Médico de Bordo',
        healthStatus: 'good',
        sleepHours: 6.8,
        currentTask: 'Análise de amostras biológicas',
        avatarColor: '#50C878',
        missionId: mission.id,
      },
      {
        name: 'Eng. Priya Patel',
        role: 'Engenheira de Sistemas',
        healthStatus: 'fatigue',
        sleepHours: 5.1,
        currentTask: 'Reparação do filtro de CO₂',
        avatarColor: '#FF6B6B',
        missionId: mission.id,
      },
      {
        name: 'Dr. Tomás Ferreira',
        role: 'Geólogo Planetário',
        healthStatus: 'good',
        sleepHours: 7.5,
        currentTask: 'Preparação de instrumentos',
        avatarColor: '#FFB347',
        missionId: mission.id,
      },
      {
        name: 'Cpt. Yuki Tanaka',
        role: 'Piloto',
        healthStatus: 'excellent',
        sleepHours: 7.0,
        currentTask: 'Simulação de entrada orbital',
        avatarColor: '#DDA0DD',
        missionId: mission.id,
      },
      {
        name: 'Eng. Kofi Asante',
        role: 'Especialista EVA',
        healthStatus: 'fatigue',
        sleepHours: 5.4,
        currentTask: 'Manutenção do escudo de radiação',
        avatarColor: '#87CEEB',
        missionId: mission.id,
      },
    ],
  });

  console.log('✅ 6 membros da tripulação criados');

  // 4 Alertas ativos
  await prisma.alert.createMany({
    data: [
      {
        code: 'ALT-042',
        priority: 'high',
        description: 'Tempestade solar prevista em 48h',
        recommendedAction: 'Preparar protocolo de proteção radiológica',
        missionId: mission.id,
      },
      {
        code: 'ALT-039',
        priority: 'medium',
        description: 'Filtro de CO₂ com eficiência abaixo de 70%',
        recommendedAction: 'Substituição ou reparação urgente',
        missionId: mission.id,
      },
      {
        code: 'ALT-041',
        priority: 'medium',
        description: 'Balanço energético negativo há 2 dias',
        recommendedAction: 'Reduzir consumo não-essencial',
        missionId: mission.id,
      },
      {
        code: 'ALT-038',
        priority: 'low',
        description: '2 membros da tripulação com fadiga acumulada',
        recommendedAction: 'Ajustar turnos de descanso',
        missionId: mission.id,
      },
    ],
  });

  console.log('✅ 4 alertas criados');

  // 7 Registos de energia (dias 136–142) — valores exatos do enunciado
  await prisma.energyLog.createMany({
    data: [
      { missionDay: 136, energyGenerated: 312, energyConsumed: 287, balance: 25,  missionId: mission.id },
      { missionDay: 137, energyGenerated: 305, energyConsumed: 291, balance: 14,  missionId: mission.id },
      { missionDay: 138, energyGenerated: 298, energyConsumed: 295, balance: 3,   missionId: mission.id },
      { missionDay: 139, energyGenerated: 310, energyConsumed: 288, balance: 22,  missionId: mission.id },
      { missionDay: 140, energyGenerated: 315, energyConsumed: 302, balance: 13,  missionId: mission.id },
      { missionDay: 141, energyGenerated: 289, energyConsumed: 310, balance: -21, missionId: mission.id },
      { missionDay: 142, energyGenerated: 295, energyConsumed: 308, balance: -13, missionId: mission.id },
    ],
  });

  console.log('✅ 7 registos de energia criados');

  // Meteorologia espacial
  await prisma.spaceWeather.create({
    data: {
      cosmicRadiation: 1.2,
      solarActivity: 'Moderada',
      micrometeoriteProb: 0.003,
      exteriorTemp: -270.4,
      solarWind: 485,
      radiationTrend: 'rising',
      solarActivityTrend: 'rising',
      meteoriteTrend: 'stable',
      tempTrend: 'stable',
      solarWindTrend: 'rising',
      missionId: mission.id,
    },
  });

  console.log('✅ Dados meteorológicos criados');

  // Log da missão — 8 entradas
  await prisma.missionLogEntry.createMany({
    data: [
      {
        type: 'info',
        message: 'Sistemas nominais. Início do dia 142 da missão.',
        source: 'system',
        missionId: mission.id,
      },
      {
        type: 'info',
        message: 'Correção orbital completada com sucesso. Delta-V: 2.3 m/s',
        source: 'system',
        missionId: mission.id,
      },
      {
        type: 'warning',
        message: 'Alerta de radiação: tempestade solar detetada pelo SOHO',
        source: 'system',
        missionId: mission.id,
      },
      {
        type: 'warning',
        message: 'Filtro de CO₂ módulo B apresenta degradação acelerada',
        source: 'system',
        missionId: mission.id,
      },
      {
        type: 'action',
        message: 'Eng. Patel iniciou procedimento de reparação do filtro',
        source: 'crew',
        missionId: mission.id,
      },
      {
        type: 'info',
        message: 'Comunicação com Deep Space Network estável — latência 4m21s',
        source: 'system',
        missionId: mission.id,
      },
      {
        type: 'info',
        message: 'Cmdr. Sousa: Equipa informada sobre protocolo de tempestade solar',
        source: 'crew',
        missionId: mission.id,
      },
      {
        type: 'info',
        message: 'Ground Control: Confirmar inventário de filtros de reserva',
        source: 'ground_control',
        missionId: mission.id,
      },
    ],
  });

  console.log('✅ 8 entradas de log criadas');
  console.log('🎉 Seed completo! Base de dados pronta.');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
