import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDateView, formatTimeView } from './FormatTime';
import { useUser } from './../User/UserContext';
import { doctorInfo, getDoctorById } from '../Doctors/DoctorInfo';

const ScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Schedules');
                if (response.ok) {
                    const schedulesData = await response.json();
                    setSchedules(schedulesData);

                    const updatedSchedules = await Promise.all(
                        schedulesData.map(async (schedule) => ({
                            ...schedule,
                            doctor: await getDoctorById(schedule.doctorId),
                        }))
                    );

                    setSchedules(updatedSchedules);
                } else {
                    console.error('Error fetching schedules:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (scheduleId) => {
        const response = await fetch(`/api/Schedules/${scheduleId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const updatedSchedules = schedules.filter((schedule) => schedule.id !== scheduleId);
            setSchedules(updatedSchedules);
        } else {
            console.error('Failed to delete schedule.');
        }
    };

    return (
        <div>
            <h2>Schedule List</h2>
            <br></br>
            {(user && user.isAdmin) && (
                <>
                    <Link className="btn btn-info" to={`/schedules/create`}>Create</Link>
                </>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.doctor ? doctorInfo(schedule.doctor) : ''}</td>
                            <td>{formatDateView(schedule.day)}</td>
                            <td>{formatTimeView(schedule.start)}</td>
                            <td>{formatTimeView(schedule.end)}</td>
                            <td><Link className="btn btn-info" to={`/schedules/${schedule.id}`}>Details</Link></td>
                            {(user && user.isAdmin) && (
                                <>
                                    <td><button className="btn btn-info" onClick={() => handleDelete(schedule.id)}>Delete</button></td>
                                    <td><Link className="btn btn-info" to={`/schedules/${schedule.id}/edit`}>Edit</Link></td>
                                </>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleList;
