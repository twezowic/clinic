import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

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

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Doctor Details</h2>
            <p>First name: {patient.firstName}</p>
            <p>Last name: {patient.lastName}</p>
            <p>The user is {patient.isActive ? 'currently' : 'not'} active</p>     
            <Link to="/patients">Go back</Link>
        </div>
    );
};

export default PatientDetails;