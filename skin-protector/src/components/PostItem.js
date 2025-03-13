import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostItem.css";

const PostItem = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div className="post-item" onClick={() => navigate(`/post/${post.id}`)}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-author">작성자: {post.author}</p>
        </div>
    );
};

export default PostItem;
