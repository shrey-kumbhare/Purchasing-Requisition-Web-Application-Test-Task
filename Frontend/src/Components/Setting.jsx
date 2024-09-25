import React from 'react';
import { useNavigate } from 'react-router-dom';  
const Settings = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/')}  >
                ←  
            </button>
            <h1>Settings</h1>
            <p>Manage your settings here.</p>
        </div>
    );
};

export default Settings;
