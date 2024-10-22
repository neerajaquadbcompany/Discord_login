
import React, { useEffect, useState } from 'react';
import { REACT_APP_END_POINT } from '../util/variable';
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch(`${REACT_APP_END_POINT}/api/status`, {
                    credentials: 'include'
                });
                const data = await response.json();
                console.log("data ==>",data)
                if (data.loggedIn) {
                    setUser(data.user);
                    console.log(user)
                } else {
                    console.log('User not logged in');
                }
            } catch (error) {
                console.error('Error fetching user status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUserStatus();
    }, []);

    if (loading) {
        return <div >Loading...</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center mt-6 gap-6'>
            <div className='text-purple-500 mr-4 '>Welcome to the Dashboard!</div>
            {user ? (
                <div className='text-white h-40 w-60 bg-gray-800 rounded-md flex flex-col items-center justify-center'>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    
                </div>
            ) : (
                <p className='text-white h-20 max-w-fit bg-gray-800 rounded-md flex flex-col items-center justify-center'>User not found. Please log in.</p>
            )}
        </div>
    );
};

export default Dashboard;
