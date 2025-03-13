import React from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignupForm from "../components/SignupForm";
import "../styles/SignupPage.css";

const SignupPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="signup-container">
            {/* 뒤로가기 버튼 */}
            <Box className="back-button">
                <IconButton onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">뒤로</Typography>
            </Box>

            {/* 제목 */}
            <Typography variant="h4" className="signup-title">
                회원가입
            </Typography>

            {/* 기본 정보 라벨 */}
            <Typography variant="subtitle1" className="signup-subtitle">
                기본 정보 <span className="required-label">필수사항</span>
            </Typography>

            {/* 회원가입 폼 */}
            <SignupForm />
        </Container>
    );
};

export default SignupPage;
