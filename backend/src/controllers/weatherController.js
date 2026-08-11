import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getWeather = async (req, res, next) => {
  try {
    const weather = await prisma.spaceWeather.findFirst({
      orderBy: { recordedAt: 'desc' }
    });
    res.json(weather);
  } catch (error) {
    next(error);
  }
};

export const getWeatherHistory = async (req, res, next) => {
  try {
    const weather = await prisma.spaceWeather.findMany({
      orderBy: { recordedAt: 'desc' },
      take: 10
    });
    res.json(weather);
  } catch (error) {
    next(error);
  }
};
