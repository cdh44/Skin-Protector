import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import "../styles/PostForm.css";

const PostForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreatePost = async () => {
        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const userId = localStorage.getItem("userId");
        const nickname = localStorage.getItem("name");

        if (!userId || !nickname) {
            alert("로그인 후 게시글을 작성할 수 있습니다.");
            navigate("/login");
            return;
        }

        try {
            await createPost({ title, content, authorId: userId, author: nickname });
            navigate("/community");
        } catch (error) {
            console.error("게시글 작성 실패:", error);
        }
    };

    return (
        <div className="post-form">
            <h2 className="post-title">게시글 작성</h2>
            <input
                type="text"
                className="post-input"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="post-textarea"
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button className="post-submit" onClick={handleCreatePost}>
                게시글 등록
            </button>
        </div>
    );
};

export default PostForm;
