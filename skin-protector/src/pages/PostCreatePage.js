import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostForm from "../components/PostForm";
import "../styles/PostCreatePage.css";
import { Box, IconButton, Typography } from "@mui/material";

const PostCreatePage = () => {
    const navigate = useNavigate();

    return (
        <div className="post-create-container">
            {/* 상단 네비게이션 바 */}
            <div className="header">
                <Box className="back-button">
                    <IconButton onClick={() => navigate("/community")}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">뒤로</Typography>
                </Box>
                <h1 className="header-title">게시글 작성</h1>
            </div>
            <PostForm />
        </div>
    );
};

export default PostCreatePage;
