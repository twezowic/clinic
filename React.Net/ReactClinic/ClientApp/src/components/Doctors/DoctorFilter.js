import React, { useState } from 'react';

const DoctorFilter = ({ onFilterChange }) => {
    const specializations = [
        'Domowy',
        'Laryngolog',
        'Dermatolog',
        'Okulista',
        'Neurolog',
        'Ortopeda',
        'Pediatra',
    ];

    const [selectedFilter, setSelectedFilter] = useState('');

    const handleButtonClick = () => {
        onFilterChange(selectedFilter);
    };

    return (
        <div>
            <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
            >
                <option value="">All</option>
                {specializations.map((spec, index) => (
                    <option key={index} value={spec}>
                        {spec}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick}>Apply</button>
        </div>
    );
};

export default DoctorFilter;