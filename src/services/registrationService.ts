import api from './api';

export const registrationService = {
  async registerForEvent(eventId: string, registrationMethod: string, questions?: any[]) {
    const response = await api.post('/registrations', {
      eventId,
      registrationMethod,
      questions,
    });
    return response.data;
  },

  async getMyRegistrations() {
    const response = await api.get('/registrations/my');
    return response.data;
  },

  async getRegistrations(params?: {
    eventId?: string;
    status?: string;
  }) {
    const response = await api.get('/registrations', { params });
    return response.data;
  },

  async cancelRegistration(id: string, reason?: string) {
    const response = await api.put(`/registrations/${id}/cancel`, {
      cancellationReason: reason,
    });
    return response.data;
  },

  async markAttendance(id: string) {
    const response = await api.put(`/registrations/${id}/attend`);
    return response.data;
  },

  async addFeedback(id: string, rating: number, feedback: string) {
    const response = await api.put(`/registrations/${id}/feedback`, {
      rating,
      feedback,
    });
    return response.data;
  },
};
