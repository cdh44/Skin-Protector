import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/memberService";

const SignupPage = () => {
    const navigate = useNavigate();
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        const birthDate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;
    
        try {
            await signup({
                email: formData.email,
                password: formData.password,
                name: formData.nickname,
                phone: formData.phone,
                birthDate,
            });
            alert("회원가입 성공!");
            navigate("/");
        } catch (error) {
            alert("회원가입 실패!");
            console.error("회원가입 오류:", error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
            {/* 뒤로가기 버튼 */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">뒤로</Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
                회원가입
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                기본 정보 <span style={{ color: "red", fontSize: "10px" }}>필수사항</span>
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                <TextField fullWidth margin="normal" label="아이디 (이메일)" name="email" onChange={handleChange} required />
                <TextField fullWidth margin="normal" type="password" label="비밀번호" name="password" onChange={handleChange} required />
                <TextField fullWidth margin="normal" type="password" label="비밀번호 확인" name="passwordConfirm" onChange={handleChange} required />

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    닉네임 <span style={{ color: "gray", fontSize: "10px" }}>선택사항</span>
                </Typography>
                <TextField fullWidth margin="normal" label="닉네임" name="nickname" onChange={handleChange} />

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    전화번호 <span style={{ color: "gray", fontSize: "10px" }}>선택사항</span>
                </Typography>
                <TextField fullWidth margin="normal" label="휴대폰 번호('-' 제외)" name="phone" onChange={handleChange} />

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    생일 <span style={{ color: "gray", fontSize: "10px" }}>선택사항</span>
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField label="년(4자)" name="birthYear" onChange={handleChange} sx={{ width: "33%" }} />
                    <TextField label="월" name="birthMonth" onChange={handleChange} sx={{ width: "33%" }} />
                    <TextField label="일" name="birthDay" onChange={handleChange} sx={{ width: "33%" }} />
                </Box>

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: '#8BC34A', "&:hover": { bgcolor: "#70A43C" } }}>
                    회원가입
                </Button>

            </Box>
        </Container>
    );
};

export default SignupPage;
