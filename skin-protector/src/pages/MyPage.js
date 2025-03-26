import React, { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { getItems } from "../services/itemService";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";

const MyPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패", error);
        }
    };

    return (
        <div className="mypage-container">
            {/* 상단 네비게이션 바 */}
            <div className="navbar">
                <IconButton edge="start" onClick={() => navigate("/home")} sx={{ color: "black" }}>
                    <ArrowBackIcon />
                </IconButton>
                <h2 className="navbar-title">마이페이지</h2>
    
                <div className="navbar-right">
                    <IconButton onClick={() => navigate("/item/create")} sx={{ color: "black" }}>
                        <AddIcon />
                    </IconButton>
                    <img src="/images/cosmetic.png" alt="Logo" className="navbar-logo" />
                </div>
            </div>
    
            {/* 화장품 목록 */}
            <List sx={{ width: "100%", mt: 10 }}>
                {items.map((item) => (
                    <ListItem key={item.id} sx={{ bgcolor: "#8BC34A", mb: 2, borderRadius: 2 }}>
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                            />
                        )}
                        <ListItemText primary={`${item.name} (유통기한: ${item.expirationDate})`} />
                    </ListItem>
                ))}
            </List>
    
            {/* 새로고침 버튼 */}
            <Button variant="contained" sx={{ mt: 2, bgcolor: "#8BC34A" }} onClick={fetchItems}>
                새로고침
            </Button>
        </div>
    );
};

export default MyPage;
