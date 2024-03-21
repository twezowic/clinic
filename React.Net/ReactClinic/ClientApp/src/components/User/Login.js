import React, { useState } from 'react';
import { useUser } from './UserContext';

const Login = () => {
    const { login } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const responsePatients = await fetch('/api/Patients');
            const dataPatients = await responsePatients.json();
            const patientUser = dataPatients.find(patient => patient.login === username && patient.password === password);

            const responseDoctors = await fetch('/api/Doctors');
            const dataDoctors = await responseDoctors.json();
            const doctorUser = dataDoctors.find(doctor => doctor.login === username && doctor.password === password);

            if (patientUser) {
                login({ username, isDoctor: false, isActive: patientUser.isActive, isAdmin: false, id: patientUser.id });
                console.log('Login successful as patient');
            } else if (doctorUser) {
                login({ username, isDoctor: true, isActive: true, isAdmin: doctorUser.isAdmin, id: doctorUser.id });
                console.log('Login successful as doctor');
            } else {
                console.log('Invalid username or password');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div>
            <div>
                <label htmlFor="username"><b>Username</b></label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
};

export default Login;
