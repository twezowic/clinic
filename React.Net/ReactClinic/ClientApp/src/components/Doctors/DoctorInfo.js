export const doctorInfo = (doctor) => {
    return doctor.specialization + ' ' + doctor.firstName[0] + '.' + doctor.lastName;
};

export const getDoctorById = async (doctorId) => {
    const response = await fetch(`/api/Doctors/${doctorId}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
};

export const getDoctors = async () => {
    const response = await fetch(`/api/Doctors/`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
}