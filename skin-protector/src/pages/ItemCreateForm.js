import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addItem } from "../services/itemService";
import { useNavigate } from "react-router-dom";

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
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="이름" name="name" onChange={handleChange} required />
            <TextField label="카테고리" name="category" onChange={handleChange} required />
            <TextField label="출시일 (YYYY-MM-DD)" name="releaseDate" onChange={handleChange} required />
            <TextField label="유통기한 (YYYY-MM-DD)" name="expirationDate" onChange={handleChange} required />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <Button type="submit" variant="contained" sx={{ bgcolor: "#8BC34A" }}>
                아이템 추가
            </Button>
        </Box>
    );
};

export default ItemCreateForm;
