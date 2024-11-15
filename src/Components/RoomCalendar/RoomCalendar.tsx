import React, { useEffect, useState } from 'react';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Стилі для DatePicker
import { EventInput } from '@fullcalendar/core';
import './RoomCalendar.scss';
import { GoogleCalendarEvent } from '../../types/GoogleCalendarEvent';
import { FullCalend } from '../FullCalend';
import { rooms } from '../../utils/RoomsList';
import CustomDatePickerInput from '../CustomInput';

const CALENDAR_API_KEY = 'AIzaSyCCb7TFBrd6eFmjDhlU12c0Za1h_Mr68zo';

export const RoomCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getEvents = (
    calendarId: string,
    startDate: string,
    endDate: string,
    callback: (e: EventInput[]) => void,
  ) => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${CALENDAR_API_KEY}&timeMin=${startDate}&timeMax=${endDate}&maxResults=1000&singleEvents=true`;

    request.get(url).end((err, resp) => {
      if (!err && resp.text) {
        const eventsApi: EventInput[] = [];
        const data = JSON.parse(resp.text);

        data.items.forEach((event: GoogleCalendarEvent) => {
          if (event.status !== 'cancelled') {
            const start = event.start.dateTime.slice(0, -6);
            const end = event.end.dateTime.slice(0, -6);

            eventsApi.push({
              title: event.summary,
              start,
              end,
              resourceId: calendarId,
              description: event.description,
            });
          }
        });

        callback(eventsApi);
      }
    });
  };

  const loadEvents = (date: Date) => {
    const allEvents: EventInput[] = [];

    const startDate = new Date(date);

    startDate.setMonth(startDate.getMonth() - 1);

    const endDate = new Date(date);

    endDate.setMonth(endDate.getMonth() + 1);

    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();

    rooms.forEach(room => {
      getEvents(room.id, startDateStr, endDateStr, (e: EventInput[]) => {
        allEvents.push(...e);
        setEvents([...allEvents]);
      });
    });
  };

  useEffect(() => {
    loadEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div className="roomCalendar">
      <div className="flex">
        <h1 className="title">Розклад домівки</h1>
        <div className="datePicker">
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date as Date)}
            dateFormat="yyyy-MM-dd"
            inline={false}
            customInput={<CustomDatePickerInput />}
          />
        </div>
      </div>
      <FullCalend events={events} selectedDate={selectedDate} />
    </div>
  );
};
