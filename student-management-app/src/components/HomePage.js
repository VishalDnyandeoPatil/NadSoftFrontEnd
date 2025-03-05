import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    const handleEnterApp = () => {
        navigate('/view-students');
    };

    return (
        <div className="text-center mt-5">
            <h1>Welcome to Student Management App</h1>
            <Button 
                variant="primary" 
                className="mt-4" 
                onClick={handleEnterApp}
            >
                Enter to Management App
            </Button>
        </div>
    );
};

export default HomePage;
