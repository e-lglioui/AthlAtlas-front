import api from '@/services/api';
import { Event, CreateEventDto,UpdateEventDto } from '../types/event.types';
const EVENTS_URL = '/events';

export const eventService = {
  async getAllEvents() {
    const { data } = await api.get<Event[]>(EVENTS_URL);
    return data;
  },

  async getEventById(id: string) {
    const { data } = await api.get<Event>(`${EVENTS_URL}/${id}`);
    return data;
  },

  async searchEvents(name: string) {
    const { data } = await api.get<Event>(`${EVENTS_URL}/ev/search?name=${name}`);
    return data;
  },

  async createEvent(event: CreateEventDto) {
    const { data } = await api.post<Event>(EVENTS_URL, event);
    return data;
  },

  async updateEvent(id: string, event: UpdateEventDto) {
    const { data } = await api.put<Event>(`${EVENTS_URL}/${id}`, event);
    return data;
  },

  async deleteEvent(id: string) {
    const { data } = await api.delete<Event>(`${EVENTS_URL}/${id}`);
    return data;
  },

  async exportParticipants(id: string) {
    const response = await api.get(`${EVENTS_URL}/${id}/registrations/export`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `event-${id}-participants.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}; 