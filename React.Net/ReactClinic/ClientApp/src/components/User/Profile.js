import React from 'react';
import { useUser } from './UserContext';

const UserProfile = () => {
    const { user } = useUser();

    return (
        <div>
            <h2>User profile</h2>
            <p>Username: {user.username}</p>

            {!user.isDoctor && (
                <>
                    <p>User type: patient</p>
                    <p>Is active: {user.isActive ? 'Active' : 'Not Active'}</p>
                </>
            )}

            {user.isDoctor && (
                <>
                    <p>User type: doctor</p>
                    <p>Is admin: {user.isAdmin ? 'Admin' : 'Not Admin'}</p>
                </>
            )}
        </div>
    );
};

export default UserProfile;
