import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

export default function MyCalendar({ events }) {
  const [value, onChange] = useState(new Date());



  return (
    <CustomCalendar>
      <Calendar onChange={onChange} 
        value={value} 
        calendarType="US" 
        locale="pt-br"
        events={events}

      />
    </CustomCalendar>
  );
}

const CustomCalendar = styled.div`
  .react-calendar {
    height: 402px;
    border-radius: 10px;
    border: none;
  }

  .react-calendar__tile--active:enabled:hover {
    color: black;
  }

  .react-calendar__tile--active:enabled:hover {
    color: black;
  }

  abbr[title] {
    font-weight: 700 !important;
  }

  .react-calendar__tile {
    margin: 13px 0;
    //props
  }

`;