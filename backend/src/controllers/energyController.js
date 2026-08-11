import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getEnergyLogs = async (req, res, next) => {
  try {
    const { days } = req.query;
    const limit = days ? parseInt(days, 10) : undefined;
    const logs = await prisma.energyLog.findMany({
      orderBy: { missionDay: 'desc' },
      take: limit
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
};

export const createEnergyLog = async (req, res, next) => {
  try {
    const mission = await prisma.mission.findFirst();
    const log = await prisma.energyLog.create({
      data: { ...req.body, missionId: mission.id }
    });
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
};

export const getEnergyStats = async (req, res, next) => {
  try {
    const logs = await prisma.energyLog.findMany();
    const stats = {
      avgGenerated: logs.reduce((acc, log) => acc + log.energyGenerated, 0) / (logs.length || 1),
      avgConsumed: logs.reduce((acc, log) => acc + log.energyConsumed, 0) / (logs.length || 1)
    };
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
