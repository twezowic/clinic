import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './../User/UserContext';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/Patients');
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (patientId) => {
        const response = await fetch(`/api/Patients/${patientId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const updatedPatients = patients.filter((patient) => patient.id !== patientId);
            setPatients(updatedPatients);
        } else {
            console.error('Failed to delete patient.');
        }
    };

    const handleActivate = async (patientId) => {
        const patientResponse = await fetch(`/api/Patients/${patientId}`);
        const patientData = await patientResponse.json();
        if (patientData) {
            const updatedPatient = {
                ...patientData,
                isActive: true,
            };

            const response = await fetch(`/api/Patients/${patientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });

        } else {
            console.error('Failed to fetch patient data');
        }
    };


    return (
        <div>
            <h2>Patient List</h2>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td><Link className="btn btn-info" to={`/patients/${patient.id}`}>Details</Link></td>
                            {(user && user.isAdmin) && (
                                <>
                                    <td><button className="btn btn-info" onClick={() => handleDelete(patient.id)}>Delete</button></td>
                                    {!patient.isActive && (
                                        <td><button className="btn btn-info" onClick={() => handleActivate(patient.id)}>Activate</button></td>
                                    )}
                                    <td><Link className="btn btn-info" to={`/patients/${patient.id}/edit`}>Edit</Link></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;