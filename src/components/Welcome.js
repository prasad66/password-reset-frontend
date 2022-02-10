import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { isExpired } from 'react-jwt'
import LoaderPage from './LoaderPage';
import UserText from './UserText';


const Welcome = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isExpired(localStorage.getItem('token'))) {
            localStorage.removeItem('token');
            navigate('/login')
        }
    }, [navigate]);

    const handleLoading = () => setLoading(true);

    return <div>
        {loading ? <LoaderPage /> : (<>
            <ResponsiveAppBar setLoading={handleLoading} />
            <UserText />
        </>
        )}
    </div>;
};

export default Welcome;
