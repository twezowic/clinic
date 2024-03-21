import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorInfo } from '../Doctors/DoctorInfo';
import { generateTime } from './FormatTime';


const ScheduleCreate = () => {
    const [newSchedule, setNewSchedule] = useState({
        doctorId: 0,
        start: '',
        end: '',
        day: ''
    });
    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        const formattedSchedule = {
            ...newSchedule,
            start: formatTime(newSchedule.start),
            end: formatTime(newSchedule.end),
        };

        const response = await fetch('/api/Schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedSchedule),
        });

        if (response.ok) {
            navigate(`/schedules`);
        } else {
            console.error('Failed to create schedule.');
        }
    };

    const formatTime = (timeString) => {
        return '2000-01-01T' + timeString;
    };

    return (
        <div>
            <h2>Create New Schedule</h2>
            <label>
                Doctor:
                <select
                    name="doctorId"
                    value={newSchedule.doctorId}
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
                    value={newSchedule.day}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Start:
                <select
                    name="start"
                    value={newSchedule.start}
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
                    value={newSchedule.end}
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
            <button onClick={handleCreate}>Create Schedule</button>
        </div>
    );
};

export default ScheduleCreate;
