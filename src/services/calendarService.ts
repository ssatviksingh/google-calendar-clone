import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';

const EVENTS_KEY = '@calendar_events';

export const getEvents = async (): Promise<Event[]> => {
  const data = await AsyncStorage.getItem(EVENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEvent = async (event: Event) => {
  const events = await getEvents();
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify([...events, event]));
};

export const updateEvent = async (updatedEvent: Event) => {
  const events = await getEvents();
  const newEvents = events.map((e: Event) =>
    e.id === updatedEvent.id ? updatedEvent : e
  );
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));
};

export const deleteEvent = async (eventId: string) => {
  const events = await getEvents();
  const newEvents = events.filter((e: Event) => e.id !== eventId);
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));
};
