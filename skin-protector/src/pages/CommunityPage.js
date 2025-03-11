import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";

const CommunityPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
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
            <AppBar position="absolute" sx={{ bgcolor: "white", color: "black", boxShadow: "none", top: 0, width: "100%" }}>
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate("/home")} sx={{ color: "black" }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
                        커뮤니티
                    </Typography>
                    <Box component="img" src="/images/cosmetic.png" alt="Logo" sx={{ height: 40 }} />
                </Toolbar>
            </AppBar>

            {/* 게시글 목록 */}
            <List sx={{ width: "100%", mt: 2 }}> {/* 위쪽 정렬을 위해 margin-top 추가 */}
                {posts.map((post) => (
                    <ListItem key={post.id} button onClick={() => navigate(`/post/${post.id}`)} sx={{ bgcolor: "#8BC34A", mb: 2, borderRadius: 2 }}>
                        <ListItemText primary={post.title} secondary={`작성자: ${post.author}`} />
                    </ListItem>
                ))}
            </List>

            {/* 게시글 작성 버튼 */}
            <IconButton
                sx={{ position: "absolute", bottom: 20, right: 20, bgcolor: "#8BC34A", color: "white", borderRadius: "50%", p: 2 }}
                onClick={() => navigate("/post/create")}
            >
                <AddIcon />
            </IconButton>
        </Container>
    );
};

export default CommunityPage;
