import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({
        comment: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Appointments/${id}`);
            if (response.ok) {
                const data = await response.json();
                setAppointment({
                    ...data,
                });
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedSchedule = {
            ...appointment
        };

        const response = await fetch(`/api/Appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedSchedule),
        });

        if (response.ok) {
            navigate(`/appointments/${id}`);
        } else {
            console.error('Failed to update patient.');
        }
    };

    if (!appointment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Add comment</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Comment:
                    <textarea
                        type="text"
                        name="comment"
                        value={appointment.comment}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AppointmentEdit;
