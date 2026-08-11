import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getLogs = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const take = limit ? parseInt(limit, 10) : undefined;
    const logs = await prisma.missionLogEntry.findMany({
      orderBy: { timestamp: 'desc' },
      take
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
};

export const createLog = async (req, res, next) => {
  try {
    const mission = await prisma.mission.findFirst();
    const log = await prisma.missionLogEntry.create({
      data: { ...req.body, missionId: mission.id }
    });
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
};
