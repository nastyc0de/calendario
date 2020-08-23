import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';

import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import moment from 'moment'
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment)
const events = [{
    title: 'cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor:'#12a1a1',
    user:{
        _id:'123',
        name:'Andres'
    }
}]

    
export const CalendarScreen = () => {
    
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#2345a2',
            borderRadius: '0px',
            opacity: 0.8,
            display:'block',
            color:'white'
        }
        return {
            style
        }
    }
    const onDoubleClick = (e) =>{
        console.log(e);
    }
    const onSelectEvent = (e) =>{
        console.log(e);
    }
    const onViewChange = (e) =>{
        setlastView(e);
        localStorage.setItem('lastView',e);
    }
    return (
        <div className='calendar-screen'>
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event:CalendarEvent
                }}
            />
            <CalendarModal/>

        </div>
    )
}
