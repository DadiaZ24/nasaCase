import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Listar tripulação com ordenação opcional
export const getCrew = async (req, res, next) => {
  try {
    const { sort, order } = req.query;
    const orderBy = {};
    if (sort) {
      orderBy[sort] = order === 'desc' ? 'desc' : 'asc';
    }
    const crew = await prisma.crewMember.findMany({
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { id: 'asc' },
    });
    res.json(crew);
  } catch (error) {
    next(error);
  }
};

// Obter membro por ID
export const getCrewById = async (req, res, next) => {
  try {
    const crew = await prisma.crewMember.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!crew) return res.status(404).json({ error: 'Membro não encontrado' });
    res.json(crew);
  } catch (error) {
    next(error);
  }
};

// Atualizar membro
export const updateCrew = async (req, res, next) => {
  try {
    const updated = await prisma.crewMember.update({
      where: { id: parseInt(req.params.id, 10) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
