import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001/api' });

export const runAnalysis = (transcript) => api.post('/analysis/run', { transcript });
export const getHistory = () => api.get('/history');
export const getAnalysis = (id) => api.get(`/history/${id}`);
export const deleteAnalysis = (id) => api.delete(`/history/${id}`);
