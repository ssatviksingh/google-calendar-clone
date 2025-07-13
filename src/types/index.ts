export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // format: 'YYYY-MM-DD'
  startTime: string; // format: 'HH:mm'
  endTime: string;   // format: 'HH:mm'
  color?: string;
};
