import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatTimeJSON, formatDateView, formatTimeView, generateTime } from './FormatTime';
import { doctorInfo } from '../Doctors/DoctorInfo';

const ScheduleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({
        doctorId: 0,
        start: '',
        end: '',
        day: ''
    });


    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/Doctors');
            if (response.ok) {
                const data = await response.json();
                setDoctors(data);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Schedules/${id}`);
            if (response.ok) {
                const data = await response.json();
                setSchedule({
                    ...data,
                    day: formatDateView(data.day),
                    start: formatTimeView(data.start),
                    end: formatTimeView(data.end),
                });
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedSchedule = {
            ...schedule,
            start: formatTimeJSON(schedule.start),
            end: formatTimeJSON(schedule.end),
        };

        const response = await fetch(`/api/Schedules/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedSchedule),
        });

        if (response.ok) {
            navigate(`/schedules/${id}`);
        } else {
            console.error('Failed to update patient.');
        }
    };

    if (!schedule) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Schedule</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Doctor:
                    <select
                        name="doctorId"
                        value={schedule.doctorId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctorInfo(doctor)}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Day:
                    <input
                        type="date"
                        name="day"
                        value={schedule.day}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Start:
                    <select
                        name="start"
                        value={schedule.start}
                        onChange={handleInputChange}
                    >

                        {generateTime().map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    End:
                    <select
                        name="end"
                        value={schedule.end}
                        onChange={handleInputChange}
                    >

                        {generateTime().map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ScheduleEdit;
