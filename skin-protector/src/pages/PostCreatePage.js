import React, { useState } from "react";
import { Container, TextField, Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

const PostCreatePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const userId = localStorage.getItem("userId");
    const nickname = localStorage.getItem("name");

    const handleCreatePost = async () => {
        if (!title || !content) {
            console.error("제목 또는 내용이 비어 있습니다.");
            return;
        }
    
        const userId = localStorage.getItem("userId");
        const nickname = localStorage.getItem("name");
    
        console.log("게시글 작성 요청:", { title, content, authorId: userId, author: nickname });
    
        try {
            await createPost({ title, content, authorId: userId, author: nickname });
            navigate("/community");
        } catch (error) {
            console.error("게시글 작성 실패:", error);
        }
    };
    

    return (
        <Container>
            {/* 상단 네비게이션 바 */}
            <AppBar position="static" sx={{ bgcolor: "white", color: "black", boxShadow: "none" }}>
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate("/community")} sx={{ color: "black" }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
                        게시글 작성
                    </Typography>
                </Toolbar>
            </AppBar>

            <Typography variant="h4" sx={{ mt: 2 }}>게시글 작성</Typography>
            <TextField label="제목" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="내용" fullWidth multiline rows={4} margin="normal" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button variant="contained" sx={{ mt: 2, bgcolor: "#8BC34A" }} onClick={handleCreatePost}>
                게시글 등록
            </Button>
        </Container>
    );
};

export default PostCreatePage;
