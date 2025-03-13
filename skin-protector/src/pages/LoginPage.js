import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPage.css"; // CSS 파일 적용

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="login-container">
            {/* 로고 */}
            <Logo src="/images/cosmetic.png" alt="cosmetic" className="login-logo" />

            {/* 제목 */}
            <Typography variant="h5" className="login-title">
                로그인
            </Typography>

            {/* 로그인 폼 */}
            <LoginForm />

            {/* 회원가입 버튼 */}
            <Button className="signup-button" onClick={() => navigate("/signup")}>
                회원가입
            </Button>
        </Container>
    );
};

export default LoginPage;
