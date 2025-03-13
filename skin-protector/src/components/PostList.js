import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts }) => {
    const navigate = useNavigate();
    return (
        <List sx={{ width: "100%", mt: 2 }}>
            {posts.map((post) => (
                <ListItem key={post.id} button onClick={() => navigate(`/post/${post.id}`)} sx={{ bgcolor: "#8BC34A", mb: 2, borderRadius: 2 }}>
                    <ListItemText primary={post.title} secondary={`작성자: ${post.author}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default PostList;
