import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        isActive: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/Patients/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPatient(data);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/Patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });

        if (response.ok) {
            navigate(`/patients/${id}`);
        } else {
            console.error('Failed to update patient.');
        }
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={patient.firstName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={patient.lastName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Is Active:
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={patient.isActive}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default PatientEdit;
