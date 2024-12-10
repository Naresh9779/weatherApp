import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle the form state
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Login or Signup</h1>
            <button onClick={toggleForm} style={styles.toggleButton}>
                {isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </button>
            {isLogin ? <Login /> : <Signup />}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    heading: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
    },
    toggleButton: {
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default AuthPage;
