import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import "../styles/SignupPage.css"; // CSS 적용

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        phone: "",
        birthYear: "",
        birthMonth: "",
        birthDay: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await signup(formData);
            alert("회원가입 성공!");
            navigate("/login");
        } catch (error) {
            console.error("회원가입 오류:", error.message);
            setError(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="signup-form">
            <TextField fullWidth margin="normal" label="아이디 (이메일)" name="email" onChange={handleChange} required />
            <TextField fullWidth margin="normal" type="password" label="비밀번호" name="password" onChange={handleChange} required />
            <TextField fullWidth margin="normal" type="password" label="비밀번호 확인" name="passwordConfirm" onChange={handleChange} required />

            <Typography variant="subtitle1" className="input-label">닉네임 (선택사항)</Typography>
            <TextField fullWidth margin="normal" label="닉네임" name="nickname" onChange={handleChange} />

            <Typography variant="subtitle1" className="input-label">전화번호 (선택사항)</Typography>
            <TextField fullWidth margin="normal" label="휴대폰 번호('-' 제외)" name="phone" onChange={handleChange} />

            <Typography variant="subtitle1" className="input-label">생일 (선택사항)</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField label="년(4자)" name="birthYear" onChange={handleChange} sx={{ width: "33%" }} />
                <TextField label="월" name="birthMonth" onChange={handleChange} sx={{ width: "33%" }} />
                <TextField label="일" name="birthDay" onChange={handleChange} sx={{ width: "33%" }} />
            </Box>

            <Button type="submit" className="signup-button">회원가입</Button>
            {error && <p className="signup-error">{error}</p>}
        </Box>
    );
};

export default SignupForm;
