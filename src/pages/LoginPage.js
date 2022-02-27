import React from 'react';
import Form from '../components/LoginForm'
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/');
        }
    }, [navigate])
return (
    
    <Form />
)
};

export default LoginPage;