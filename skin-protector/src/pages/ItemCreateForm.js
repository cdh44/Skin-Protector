import React, { useState } from "react";
import { TextField, Button, Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addItem } from "../services/itemService";
import { useNavigate } from "react-router-dom";
import "../styles/ItemCreateForm.css"; // CSS 연결

const ItemCreateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        releaseDate: "",
        expirationDate: ""
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addItem(formData, file);
            alert("아이템 추가 성공!");
            navigate("/mypage");
        } catch (error) {
            console.error("아이템 추가 오류:", error);
        }
    };

    return (
        <div className="item-create-container">
            <div className="header">
                <Box className="back-button">
                    <IconButton onClick={() => navigate("/mypage")}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">뒤로</Typography>
                </Box>
                <h1 className="header-title">화장품 추가</h1>
            </div>

            <Box
                component="form"
                onSubmit={handleSubmit}
                className="item-form"
            >
                <TextField label="이름" name="name" onChange={handleChange} required />
                <TextField label="카테고리" name="category" onChange={handleChange} required />
                <TextField label="출시일 (YYYY-MM-DD)" name="releaseDate" onChange={handleChange} required />
                <TextField label="유통기한 (YYYY-MM-DD)" name="expirationDate" onChange={handleChange} required />
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <Button type="submit" variant="contained" sx={{ bgcolor: "#8BC34A" }}>
                    아이템 추가
                </Button>
            </Box>
        </div>
    );
};

export default ItemCreateForm;
