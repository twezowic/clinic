import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDateView, formatTimeView } from './../Schedules/FormatTime';
import { getDoctorById, doctorInfo } from '../Doctors/DoctorInfo';

const AppointmentDetails = () => {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Appointments/${id}`);
            if (response.ok) {
                const data = await response.json();
                setAppointment(data);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (appointment) {
                const doctor = await getDoctorById(appointment.doctorId);
                const dataWithDoctor = { ...appointment, doctor };
                setAppointment(dataWithDoctor);
            }
        };

        fetchData();
    }, [appointment]);

    if (!appointment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Schedule Details</h2>
            <p>Doctor: {appointment.doctor ? doctorInfo(appointment.doctor) : 'Unknown Doctor'}</p>
            <p>Day: {formatDateView(appointment.date)}</p>
            <p>Start: {formatTimeView(appointment.start)}</p>
            <p>Comment: {appointment.comment}</p>

            <Link to="/schedules">Go back</Link>
        </div>
    );
};

export default AppointmentDetails;
