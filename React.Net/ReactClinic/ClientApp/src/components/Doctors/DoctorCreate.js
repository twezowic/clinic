import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorFilter from './DoctorFilter';

const DoctorCreate = () => {
    const [newDoctor, setNewDoctor] = useState({
        firstName: '',
        lastName: '',
        specialization: '',
        isAdmin: false,
        login: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCreate = async () => {
        const response = await fetch('/api/Doctors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDoctor),
        });

        if (response.ok) {
            navigate(`/doctors`);
        } else {
            console.error('Failed to create doctor.');
        }
    };

    return (
        <div>
            <h2>Create New Doctor</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={newDoctor.firstName}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={newDoctor.lastName}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px' }}>
                    Specialization:
                </label>
                <DoctorFilter onFilterChange={(selectedFilter) => setNewDoctor((prevDoctor) => ({ ...prevDoctor, specialization: selectedFilter }))} />
            </div>
            <label>
                Is Admin:
                <input
                    type="checkbox"
                    name="isAdmin"
                    checked={newDoctor.isAdmin}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                login:
                <input
                    type="text"
                    name="login"
                    value={newDoctor.login}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={newDoctor.password}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button onClick={handleCreate}>Create Doctor</button>
        </div>
    );
};

export default DoctorCreate;
