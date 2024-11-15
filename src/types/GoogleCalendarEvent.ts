export type GoogleCalendarEvent = {
  status: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  description: string;
}