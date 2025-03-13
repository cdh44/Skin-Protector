import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";
import PostList from "../components/PostList";

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
        <Container maxWidth="xs" sx={{ height: "100vh", position: "relative", pt: 10 }}>
            <AppBar position="absolute" sx={{ bgcolor: "white", color: "black", boxShadow: "none", top: 0, width: "100%" }}>
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate("/home")} sx={{ color: "black" }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">커뮤니티</Typography>
                    <Box component="img" src="/images/cosmetic.png" alt="Logo" sx={{ height: 40 }} />
                </Toolbar>
            </AppBar>
            <PostList posts={posts} />
            <IconButton sx={{ position: "absolute", bottom: 20, right: 20, bgcolor: "#8BC34A", color: "white" }} onClick={() => navigate("/post/create")}>
                <AddIcon />
            </IconButton>
        </Container>
    );
};

export default CommunityPage;
