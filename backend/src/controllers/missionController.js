import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMission = async (req, res, next) => {
  try {
    const mission = await prisma.mission.findFirst();
    res.json(mission);
  } catch (error) {
    next(error);
  }
};

export const updateMission = async (req, res, next) => {
  try {
    const mission = await prisma.mission.findFirst();
    const updated = await prisma.mission.update({
      where: { id: mission.id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
