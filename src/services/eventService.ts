import api from './api';

export interface Event {
  _id?: string;
  id?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  date: string;
  time: string;
  location: string;
  locationEn?: string;
  type: 'workshop' | 'hackathon' | 'meetup' | 'conference' | 'webinar' | 'competition' | 'other';
  category: 'technical' | 'design' | 'business' | 'networking' | 'social' | 'other';
  image?: string;
  capacity: number;
  attendees: number;
  registrationMethod: 'google-forms' | 'typeform' | 'microsoft-forms' | 'eventbrite' | 'airtable' | 'custom';
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured?: boolean;
  tags?: string[];
  isPublic?: boolean;
  organizer?: any;
  createdAt?: string;
  createdBy?: string;
}

export const eventService = {
  async getEvents(params?: {
    type?: string;
    status?: string;
    featured?: boolean;
    search?: string;
    sort?: string;
  }) {
    const response = await api.get('/events', { params });
    return response.data;
  },

  async getEvent(id: string) {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  async createEvent(eventData: Partial<Event>) {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  async updateEvent(id: string, eventData: Partial<Event>) {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  async deleteEvent(id: string) {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  async getEventStats(id: string) {
    const response = await api.get(`/events/${id}/stats`);
    return response.data;
  },
};
