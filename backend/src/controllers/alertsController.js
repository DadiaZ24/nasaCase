import { PrismaClient } from '@prisma/client';
import { decisionService } from '../services/decisionService.js';
const prisma = new PrismaClient();

// Listar alertas com filtros opcionais
export const getAlerts = async (req, res, next) => {
  try {
    const { resolved, priority } = req.query;
    const where = {};
    if (resolved !== undefined) {
      where.isResolved = resolved === 'true';
    }
    if (priority) {
      where.priority = priority;
    }
    const alerts = await prisma.alert.findMany({
      where,
      orderBy: [
        { isResolved: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    res.json(alerts);
  } catch (error) {
    next(error);
  }
};

// Obter alerta por ID
export const getAlertById = async (req, res, next) => {
  try {
    const alert = await prisma.alert.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!alert) return res.status(404).json({ error: 'Alerta não encontrado' });
    res.json(alert);
  } catch (error) {
    next(error);
  }
};

// Criar novo alerta
export const createAlert = async (req, res, next) => {
  try {
    const mission = await prisma.mission.findFirst();
    const alert = await prisma.alert.create({
      data: { ...req.body, missionId: mission.id },
    });
    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

// Resolver alerta — aplica ação e consequências
export const resolveAlert = async (req, res, next) => {
  try {
    const { action } = req.body;
    if (!action) {
      return res.status(400).json({ error: 'Ação é obrigatória' });
    }
    const result = await decisionService.resolveAlert(
      parseInt(req.params.id, 10),
      action
    );
    if (result.error) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
