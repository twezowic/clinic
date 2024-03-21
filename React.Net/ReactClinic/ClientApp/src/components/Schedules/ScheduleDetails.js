import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDateView, formatTimeView } from './FormatTime';
import { getDoctorById, doctorInfo } from '../Doctors/DoctorInfo';

const ScheduleDetails = () => {
    const { id } = useParams();
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Schedules/${id}`);
            if (response.ok) {
                const data = await response.json();
                setSchedule(data);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (schedule) {
                const doctor = await getDoctorById(schedule.doctorId);
                const dataWithDoctor = { ...schedule, doctor };
                setSchedule(dataWithDoctor);
            }
        };

        fetchData();
    }, [schedule]);

    if (!schedule) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Schedule Details</h2>
            <p>Doctor: {schedule.doctor ? doctorInfo(schedule.doctor) : 'Unknown Doctor'}</p>
            <p>Day: {formatDateView(schedule.day)}</p>
            <p>Start: {formatTimeView(schedule.start)}</p>
            <p>End: {formatTimeView(schedule.end)}</p>

            <Link to="/schedules">Go back</Link>
        </div>
    );
};

export default ScheduleDetails;
