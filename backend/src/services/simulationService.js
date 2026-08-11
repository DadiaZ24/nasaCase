import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

class SimulationService {
  constructor() {
    this.io = null;
    this.task = null;
    this.tickCount = 0;
    this.isRunning = false;
  }

  setIo(io) {
    this.io = io;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.task = cron.schedule('* * * * * *', () => {
      this.tick().catch(console.error);
    }); 
  }

  stop() {
    if (this.task) {
      this.task.stop();
    }
    this.isRunning = false;
  }

  getStatus() {
    return { isRunning: this.isRunning, tickCount: this.tickCount };
  }

  async tick() {
    this.tickCount++;
    const mission = await prisma.mission.findFirst();
    if (!mission) return;

    // Atualiza status da missão
    const updatedMission = await prisma.mission.update({
      where: { id: mission.id },
      data: {
        currentDay: { increment: 1/24 }, 
        distanceToMars: { decrement: 0.1 },
        distanceToEarth: { increment: 0.1 },
        currentSpeed: mission.currentSpeed + (Math.random() * 200 - 100),
        commDelay: { increment: 0.05 }
      }
    });

    if (this.io) {
      this.io.emit('mission:update', updatedMission);
      this.io.emit('simulation:tick', { tick: this.tickCount });
    }

    if (this.tickCount % 10 === 0) {
      const logs = await prisma.energyLog.findMany({ orderBy: { missionDay: 'desc' }, take: 1 });
      const lastDay = logs.length > 0 ? logs[0].missionDay : updatedMission.currentDay;
      const generated = 120 + Math.random() * 10 - 5;
      const consumed = 115 + Math.random() * 10 - 5;
      const energy = await prisma.energyLog.create({
        data: {
          missionDay: Math.floor(updatedMission.currentDay),
          energyGenerated: generated,
          energyConsumed: consumed,
          balance: generated - consumed,
          missionId: mission.id
        }
      });
      
      const systems = await prisma.shipSystem.findMany();
      for (const sys of systems) {
        let degradation = Math.random() * 2 + 1;
        if (sys.status === 'warning') degradation *= 1.5;
        await prisma.shipSystem.update({
          where: { id: sys.id },
          data: { level: Math.max(0, sys.level - degradation) }
        });
      }
      
      if (this.io) {
        this.io.emit('energy:update', energy);
        this.io.emit('system:update', await prisma.shipSystem.findMany());
      }
    }

    if (this.tickCount % 30 === 0) {
      const weather = await prisma.spaceWeather.create({
        data: {
          cosmicRadiation: 3 + Math.random(),
          solarActivity: 'normal',
          micrometeoriteProb: 0.02,
          exteriorTemp: -245 + Math.random() * 10,
          solarWind: 450 + Math.random() * 20,
          radiationTrend: 'stable',
          solarActivityTrend: 'stable',
          meteoriteTrend: 'stable',
          tempTrend: 'stable',
          solarWindTrend: 'stable',
          missionId: mission.id
        }
      });
      if (this.io) {
        this.io.emit('weather:update', weather);
      }
      
      const crews = await prisma.crewMember.findMany();
      for (const crew of crews) {
        await prisma.crewMember.update({
          where: { id: crew.id },
          data: { sleepHours: Math.max(0, crew.sleepHours + (Math.random() - 0.5)) }
        });
      }
      if (this.io) {
        this.io.emit('crew:update', await prisma.crewMember.findMany());
      }
    }
  }
}

export const simulationService = new SimulationService();
