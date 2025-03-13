import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostList from "../components/PostList";
import "../styles/CommunityPage.css";
import { IconButton } from "@mui/material";

const CommunityPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5); // 초기 게시글 개수

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

    // "더보기" 버튼 클릭 시 추가 로드
    const loadMorePosts = () => {
        setVisiblePosts((prev) => prev + 5);
    };

    return (
        <div className="community-container">
            {/* 상단 네비게이션 바 */}
            <div className="navbar">
                <IconButton edge="start" onClick={() => navigate("/home")} sx={{ color: "black" }}>
                    <ArrowBackIcon />
                </IconButton>
                <h2 className="navbar-title">커뮤니티</h2>
                <img src="/images/cosmetic.png" alt="Logo" className="navbar-logo" />
            </div>

            {/* 게시글 목록 */}
            <div className="post-list-wrapper">
                <div className="post-list-container">
                    <PostList posts={posts.slice(0, visiblePosts)} />
                </div>

                {/* "더보기" 버튼 (게시글이 남아있을 경우에만 표시) */}
                {visiblePosts < posts.length && (
                    <button className="load-more-button" onClick={loadMorePosts}>
                        더보기
                    </button>
                )}
            </div>

            {/* + 버튼 (위치 고정, 게시물과 겹치지 않음) */}
            <button className="add-button" onClick={() => navigate("/post/create")}>+</button>
        </div>
    );
};

export default CommunityPage;
