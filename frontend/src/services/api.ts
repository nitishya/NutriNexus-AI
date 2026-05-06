import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const createProfile = async (profile: any) => {
  const response = await api.post('/user/profile', profile);
  return response.data;
};

export const getRecommendation = async (userId: string, context: string = 'home') => {
  const response = await api.get(`/meal/recommendation?userId=${userId}&context=${context}`);
  return response.data;
};

export const askAssistant = async (userId: string, message: string) => {
  const response = await api.post('/ask', { userId, message });
  return response.data;
};

export const logMeal = async (meal: any) => {
  const response = await api.post('/meal/log', meal);
  return response.data;
};

export default api;
