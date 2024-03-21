import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientCreate = () => {
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        isActive: false,
        login: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPatient((prevPatient) => ({
            ...prevPatient,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCreate = async () => {
        const response = await fetch('/api/Patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient),
        });

        if (response.ok) {
            navigate(`/patients`);
        } else {
            console.error('Failed to create doctor.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={newPatient.firstName}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={newPatient.lastName}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Birth Date:
                <input
                    type="date"
                    name="birthDate"
                    value={newPatient.birthDate}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                login:
                <input
                    type="text"
                    name="login"
                    value={newPatient.login}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={newPatient.password}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button onClick={handleCreate}>Create Patient</button>
        </div>
    );
};

export default PatientCreate;
