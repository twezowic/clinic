import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDateView, formatTimeView } from '../Schedules/FormatTime';
import { useUser } from '../User/UserContext';
import { doctorInfo, getDoctorById } from '../Doctors/DoctorInfo';
import { useNavigate } from 'react-router-dom';

const AppointmentCreate = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Appointments');
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

    const handleDelete = async (appointmentId) => {
        const response = await fetch(`/api/Appointments/${appointmentId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
            setAppointments(updatedAppointments);
        } else {
            console.error('Failed to delete appointment.');
        }
    };

    const handleSign = async (appointmentId) => {
        const patientResponse = await fetch(`/api/Appointments/${appointmentId}`);
        const patientData = await patientResponse.json();
        if (patientData) {
            const updatedPatient = {
                ...patientData,
                patientId: user.id,
            };

            const response = await fetch(`/api/Appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });
            navigate(`/appointments`);
        } else {
            console.error('Failed to fetch appointment data');
        }
    };

    return (
        <div>
            <h2>Appointment List</h2>
            <br></br>
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
                        (appointment.patientId == null) ? (
                            <tr key={appointment.id}>
                                <td>{appointment.doctor ? doctorInfo(appointment.doctor) : ''}</td>
                                <td>{formatDateView(appointment.date)}</td>
                                <td>{formatTimeView(appointment.start)}</td>
                                <td><Link className="btn btn-info" to={`/appointments/${appointment.id}`}>Details</Link></td>
                                {user && (
                                    <>
                                        {user.isAdmin && (
                                            <>
                                                <td><button className="btn btn-info" onClick={() => handleDelete(appointment.id)}>Delete</button></td>
                                                <td><Link className="btn btn-info" to={`/appointments/${appointment.id}/edit`}>Edit</Link></td>
                                            </>
                                        )}
                                        {!user.isDoctor && (
                                            <>
                                                <td><button className="btn btn-info" onClick={() => handleSign(appointment.id)}>Sign</button></td>
                                            </>
                                        )}
                                    </>
                                )}
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default AppointmentCreate;
