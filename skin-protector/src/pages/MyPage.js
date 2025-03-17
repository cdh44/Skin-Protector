import React, { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { getItems } from "../services/itemService";
import { useNavigate } from "react-router-dom";

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
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                position: "relative",
                pt: 10, // 상단 네비게이션 바와 간격 조정
            }}
        >
            {/* 상단 네비게이션 바 */}
            <AppBar
                position="absolute"
                sx={{ bgcolor: "white", color: "black", boxShadow: "none", top: 0, width: "100%" }}
            >
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate("/home")} sx={{ color: "black" }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
                        내 화장품 관리
                    </Typography>
                    <Box component="img" src="/images/cosmetic.png" alt="Logo" sx={{ height: 40 }} />
                </Toolbar>
            </AppBar>

            {/* 화장품 목록 */}
            <List sx={{ width: "100%", mt: 2 }}>
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

            {/* 마이페이지 화장품 추가 버튼 (+) */}
            <IconButton
                className="add-item-button"
                onClick={() => navigate("/item/create")}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    bgcolor: "#8BC34A",
                    color: "white",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    "&:hover": { bgcolor: "#70A43C" }
                }}
            >
                <AddIcon />
            </IconButton>
        </Container>
    );
};

export default MyPage;
