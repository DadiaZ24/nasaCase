const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

/**
 * Trata a resposta da API, lançando erro se não for OK
 */
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${res.statusText}`);
  }
  return res.json();
};

// === MISSÃO ===
export const getMission = () =>
  fetch(`${API_URL}/api/mission`).then(handleResponse);

export const updateMission = (data) =>
  fetch(`${API_URL}/api/mission`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

// === SISTEMAS ===
export const getSystems = (status = '') =>
  fetch(`${API_URL}/api/systems${status ? `?status=${status}` : ''}`).then(handleResponse);

export const getSystem = (id) =>
  fetch(`${API_URL}/api/systems/${id}`).then(handleResponse);

export const updateSystem = (id, data) =>
  fetch(`${API_URL}/api/systems/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

// === TRIPULAÇÃO ===
export const getCrew = (sort = '', order = '') => {
  const params = new URLSearchParams();
  if (sort) params.set('sort', sort);
  if (order) params.set('order', order);
  const qs = params.toString();
  return fetch(`${API_URL}/api/crew${qs ? `?${qs}` : ''}`).then(handleResponse);
};

export const getCrewMember = (id) =>
  fetch(`${API_URL}/api/crew/${id}`).then(handleResponse);

export const updateCrewMember = (id, data) =>
  fetch(`${API_URL}/api/crew/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

// === ALERTAS ===
export const getAlerts = (resolved, priority) => {
  const params = new URLSearchParams();
  if (resolved !== undefined) params.set('resolved', resolved);
  if (priority) params.set('priority', priority);
  const qs = params.toString();
  return fetch(`${API_URL}/api/alerts${qs ? `?${qs}` : ''}`).then(handleResponse);
};

export const getAlert = (id) =>
  fetch(`${API_URL}/api/alerts/${id}`).then(handleResponse);

export const createAlert = (data) =>
  fetch(`${API_URL}/api/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const resolveAlert = (id, action) =>
  fetch(`${API_URL}/api/alerts/${id}/resolve`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  }).then(handleResponse);

// === ENERGIA ===
export const getEnergy = (days = 7) =>
  fetch(`${API_URL}/api/energy?days=${days}`).then(handleResponse);

export const getEnergyStats = () =>
  fetch(`${API_URL}/api/energy/stats`).then(handleResponse);

// === METEOROLOGIA ESPACIAL ===
export const getWeather = () =>
  fetch(`${API_URL}/api/weather`).then(handleResponse);

// === LOG DA MISSÃO ===
export const getLog = (limit = 50) =>
  fetch(`${API_URL}/api/log?limit=${limit}`).then(handleResponse);

export const createLogEntry = (data) =>
  fetch(`${API_URL}/api/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

// === SIMULAÇÃO ===
export const startSimulation = () =>
  fetch(`${API_URL}/api/simulation/start`, { method: 'POST' }).then(handleResponse);

export const stopSimulation = () =>
  fetch(`${API_URL}/api/simulation/stop`, { method: 'POST' }).then(handleResponse);

export const getSimulationStatus = () =>
  fetch(`${API_URL}/api/simulation/status`).then(handleResponse);

export const tickSimulation = () =>
  fetch(`${API_URL}/api/simulation/tick`, { method: 'POST' }).then(handleResponse);
