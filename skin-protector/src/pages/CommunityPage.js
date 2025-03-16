import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostList from "../components/PostList";
import "../styles/CommunityPage.css";
import { IconButton } from "@mui/material";
/* MUI 아이콘 사용 시 */
import AddIcon from "@mui/icons-material/Add";

const CommunityPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5);

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

                {/* 오른쪽 영역 (플러스 버튼, 로고 등) */}
                <div className="navbar-right">
                    {/* + 버튼 (IconButton) */}
                    <IconButton onClick={() => navigate("/post/create")} sx={{ color: "black" }}>
                        <AddIcon />
                    </IconButton>
                    <img src="/images/cosmetic.png" alt="Logo" className="navbar-logo" />
                </div>
            </div>

            {/* 게시글 목록 */}
            <div className="post-list-wrapper">
                <div className="post-list-container">
                    <PostList posts={posts.slice(0, visiblePosts)} />
                </div>

                {/* "더보기" 버튼 (게시글이 남아있을 경우 표시) */}
                {visiblePosts < posts.length && (
                    <button className="load-more-button" onClick={loadMorePosts}>
                        더보기
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommunityPage;
