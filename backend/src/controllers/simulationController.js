import { simulationService } from '../services/simulationService.js';

export const startSimulation = (req, res) => {
  simulationService.start();
  res.json({ message: 'Simulação iniciada' });
};

export const stopSimulation = (req, res) => {
  simulationService.stop();
  res.json({ message: 'Simulação parada' });
};

export const tickSimulation = async (req, res, next) => {
  try {
    await simulationService.tick();
    res.json({ message: 'Tick manual executado' });
  } catch (error) {
    next(error);
  }
};

export const getSimulationStatus = (req, res) => {
  res.json(simulationService.getStatus());
};
