import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Listar sistemas com filtro opcional por estado
export const getSystems = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const systems = await prisma.shipSystem.findMany({
      where,
      orderBy: { id: 'asc' },
    });
    res.json(systems);
  } catch (error) {
    next(error);
  }
};

// Obter sistema por ID
export const getSystemById = async (req, res, next) => {
  try {
    const system = await prisma.shipSystem.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!system) return res.status(404).json({ error: 'Sistema não encontrado' });
    res.json(system);
  } catch (error) {
    next(error);
  }
};

// Atualizar sistema
export const updateSystem = async (req, res, next) => {
  try {
    const updated = await prisma.shipSystem.update({
      where: { id: parseInt(req.params.id, 10) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
