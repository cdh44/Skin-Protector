import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";
import BackButton from "../components/BackButton";
import PostList from "../components/PostList";
import "../styles/CommunityPage.css"; // CSS 파일 불러오기

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
        <div className="community-container">
            {/* 상단 네비게이션 바 */}
            <div className="navbar">
                <BackButton onClick={() => navigate("/home")} />
                <h2 className="navbar-title">커뮤니티</h2>
                <img src="/images/cosmetic.png" alt="Logo" className="navbar-logo" />
            </div>

            {/* 게시글 목록 */}
            <PostList posts={posts} />

            {/* 게시글 작성 버튼 */}
            <button className="add-button" onClick={() => navigate("/post/create")}>+</button>
        </div>
    );
};

export default CommunityPage;
