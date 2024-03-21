import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

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

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Doctor Details</h2>
            <p>First name: {doctor.firstName}</p>
            <p>Last name: {doctor.lastName}</p>
            <p>Specialization: {doctor.specialization}</p>
            <Link to="/doctors">Go back</Link>
        </div>
    );
};

export default DoctorDetails;