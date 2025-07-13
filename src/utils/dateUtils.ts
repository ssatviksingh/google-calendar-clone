export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  export const formatTime = (date: Date): string => {
    return date.toTimeString().slice(0, 5);
  };
  