import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDateView, formatTimeView } from '../Schedules/FormatTime';
import { useUser } from '../User/UserContext';
import { doctorInfo, getDoctorById } from '../Doctors/DoctorInfo';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/Appointments?patientId=${user.id}`);
                if (response.ok) {
                    const appointmentsData = await response.json();
                    setAppointments(appointmentsData);

                    const updatedAppointments = await Promise.all(
                        appointmentsData.map(async (appointment) => ({
                            ...appointment,
                            doctor: await getDoctorById(appointment.doctorId)
                        }))
                    );

                    setAppointments(updatedAppointments);
                } else {
                    console.error('Error fetching appointments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleCancel = async (appointmentId) => {
        const patientResponse = await fetch(`/api/Appointments/${appointmentId}`);
        const patientData = await patientResponse.json();
        if (patientData) {
            const updatedPatient = {
                ...patientData,
                patientId: null,
            };

            const response = await fetch(`/api/Appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });


            if (response.ok) {
                const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
                setAppointments(updatedAppointments);
            } else {
                console.error('Failed to delete schedule.');
            }

        } else {
            console.error('Failed to fetch appointment data');
        }
    };

    return (
        <div>
            <h2>Appointment List</h2>
            <br></br>
            <Link className="btn btn-info" to={`/appointments/create`}>Create</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Day</th>
                        <th>Start</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.doctor ? doctorInfo(appointment.doctor) : ''}</td>
                            <td>{formatDateView(appointment.date)}</td>
                            <td>{formatTimeView(appointment.start)}</td>
                            <td><Link className="btn btn-info" to={`/appointments/${appointment.id}`}>Details</Link></td>
                            <td><button className="btn btn-info" onClick={() => handleCancel(appointment.id)}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;
