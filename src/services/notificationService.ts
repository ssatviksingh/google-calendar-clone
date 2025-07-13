import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { Event } from '../types';

export const scheduleNotification = async (event: Event) => {
  const eventDate = new Date(`${event.date}T${event.startTime}:00`);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Event Reminder',
      body: event.title,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.CALENDAR,
      year: eventDate.getFullYear(),
      month: eventDate.getMonth() + 1,
      day: eventDate.getDate(),
      hour: eventDate.getHours(),
      minute: eventDate.getMinutes(),
      second: 0,
      repeats: false,
      },      
  });
};
