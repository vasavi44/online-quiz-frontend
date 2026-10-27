import api from './axios';

export const quizApi = {
  getQuestions: async () => {
    const response = await api.get('/api/quiz/questions');
    return response.data;
  },

  submitQuiz: async (answers) => {
    const response = await api.post('/api/quiz/submit', { answers });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/api/quiz/history');
    return response.data;
  },
};
