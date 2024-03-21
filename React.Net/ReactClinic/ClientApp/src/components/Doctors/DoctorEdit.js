import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorFilter from './DoctorFilter';

const DoctorEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        firstName: '',
        lastName: '',
        specialization: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Doctors/${id}`);
            if (response.ok) {
                const data = await response.json();
                setDoctor(data);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/Doctors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctor),
        });

        if (response.ok) {
            navigate(`/doctors/${id}`);
        } else {
            console.error('Failed to update doctor.');
        }
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Doctor</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={doctor.firstName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={doctor.lastName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>
                        Specialization:
                    </label>
                    <DoctorFilter onFilterChange={(selectedFilter) => setDoctor((prevDoctor) => ({ ...prevDoctor, specialization: selectedFilter }))} />
                </div>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default DoctorEdit;
