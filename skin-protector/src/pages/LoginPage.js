import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ id: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        try {
            const response = await login(credentials.id, credentials.password);

            if (response.token) {
                alert("로그인 성공!");
                navigate("/home"); // 홈페이지 이동
            }
        } catch (error) {
            console.error("로그인 오류:", error.message);
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
            {/* 로고 이미지 (화장품 아이콘) */}
            <Box component="img" src="/images/cosmetic.png" alt="cosmetic" sx={{ width: 80, height: 80, mb: 4 }} />

            <Typography variant="h5" gutterBottom>
                로그인
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
                <TextField fullWidth margin="normal" label="아이디" name="id" value={credentials.id} onChange={handleChange} required />
                <TextField fullWidth margin="normal" type="password" label="비밀번호" name="password" value={credentials.password} onChange={handleChange} required />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: '#8BC34A' }}>
                    로그인
                </Button>
            </Box>

            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#70A43C' }} onClick={() => navigate('/signup')}>
                회원가입
            </Button>

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Container>
    );
};

export default LoginPage;
