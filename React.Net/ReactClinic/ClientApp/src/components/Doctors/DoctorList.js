import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorFilter from './DoctorFilter';
import { useUser } from './../User/UserContext';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const { user } = useUser();

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

    const handleDelete = async (doctorId) => {
        const response = await fetch(`/api/Doctors/${doctorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
                setDoctors(updatedDoctors);
            } else {
                console.error('Failed to delete doctor.');
            }
    };
    const handleFilter = async (selectedFilter) => {
          try {
              if (!selectedFilter) {
                  selectedFilter = "";
              }
              const response = await fetch(`/api/Doctors?spec=${selectedFilter}`);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const jsonData = await response.json();
              console.log('Pobrane dane:', jsonData);
              setDoctors(jsonData);
          } catch (error) {
              console.error('Błąd pobierania danych:', error.message);
              setDoctors([]);
          }
  };



    return (
        <div>
            <h2>Doctor List</h2>
            <DoctorFilter onFilterChange={handleFilter} />
            <br></br>
            {(user && user.isAdmin) && (
                <>
                    <Link className="btn btn-info" to={`/doctors/create`}>Create</Link>
                </>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.specialization}</td>
                            <td><Link className="btn btn-info" to={`/doctors/${doctor.id}`}>Details</Link></td>
                            {(user && user.isAdmin) && (
                                <>
                                    <td><button className="btn btn-info" onClick={() => handleDelete(doctor.id)}>Delete</button></td>
                                    <td><Link className="btn btn-info" to={`/doctors/${doctor.id}/edit`}>Edit</Link></td>
                                </>
                            ) }

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorList;