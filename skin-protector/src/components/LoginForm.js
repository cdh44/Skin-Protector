import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/LoginPage.css"; // CSS 적용

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ id: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await login(credentials.id, credentials.password);
            if (response.token) {
                alert("로그인 성공!");
                navigate("/home");
            }
        } catch (error) {
            console.error("로그인 오류:", error.message);
            setError(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} className="login-form">
            <TextField fullWidth label="아이디" name="id" onChange={handleChange} required className="login-input" />
            <TextField fullWidth type="password" label="비밀번호" name="password" onChange={handleChange} required className="login-input" />
            <Button type="submit" className="login-button">
                로그인
            </Button>
            {error && <p className="login-error">{error}</p>}
        </Box>
    );
};

export default LoginForm;
