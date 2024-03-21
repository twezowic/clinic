export const formatDateView = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatTimeView = (timeString) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(timeString).toLocaleTimeString(undefined, options);
};

export const formatTimeJSON = (timeString) => {
    return '2000-01-01T' + timeString;
};

export const generateTime = () => {
    const times = [];

    for (let hours = 8; hours < 20; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const timeString = `${formattedHours}:${formattedMinutes}`;
            times.push(timeString);
        }
    }
    return times;
};