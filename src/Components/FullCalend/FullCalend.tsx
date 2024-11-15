import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollgridPlugin from '@fullcalendar/scrollgrid';
import 'react-datepicker/dist/react-datepicker.css'; // Стилі для DatePicker
import { EventInput, EventContentArg } from '@fullcalendar/core';
import './FullCalend.scss';
import { RoomEnum } from '../../types/RoomEnum';
import { rooms } from '../../utils/RoomsList';

type Props = {
  events: EventInput[];
  selectedDate: Date;
};

export const FullCalend: React.FC<Props> = ({ events, selectedDate }) => {
  const eventClasses = (arg: EventContentArg) => {
    if (!arg.event._def || !arg.event._def.resourceIds) {
      return '';
    }

    switch (arg.event._def.resourceIds[0]) {
      case RoomEnum.Conf:
        return ['eventStyle', 'eventStyle--conf'];
      case RoomEnum.Mans:
        return ['eventStyle', 'eventStyle--mans'];
      case RoomEnum.Nova:
        return ['eventStyle', 'eventStyle--nova'];
      case RoomEnum.Patr:
        return ['eventStyle', 'eventStyle--part'];
      case RoomEnum.Pidv:
        return ['eventStyle', 'eventStyle--pidv'];
      case RoomEnum.Ptas:
        return ['eventStyle', 'eventStyle--ptas'];
      case RoomEnum.Yuna:
        return ['eventStyle', 'eventStyle--yuna'];
      default:
        return ['eventStyle'];
    }
  };

  const calendarRef = useRef<FullCalendar | null>(null);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventContent = ({ event }: any) => {
    return (
      <div>
        <strong>{event.title}</strong>
        <div>{`${formatTime(event.start)} - ${formatTime(event.end)}`}</div>
        <div className="vuhovnuk">{event.extendedProps.description}</div>
      </div>
    );
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, resourceTimeGridPlugin, scrollgridPlugin]}
      initialView="resourceTimeGridDay"
      events={events}
      locale="uk"
      dayMinWidth={170}
      eventContent={eventContent}
      resources={rooms.map(room => ({
        id: room.id,
        title: room.title,
      }))}
      slotMinTime="08:00:00"
      slotMaxTime="23:00:00"
      allDaySlot={false}
      height="auto"
      slotLabelFormat={function (date) {
        const hour = date.date.hour.toString().padStart(2, '0');
        const minute = date.date.minute.toString().padStart(2, '0');

        return `${hour}:${minute}`;
      }}
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      eventClassNames={eventClasses}
      titleFormat={{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }}
    />
  );
};
