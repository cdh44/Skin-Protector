import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, AppBar, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../services/postService";
import { getComments, addComment, updateComment, deleteComment } from "../services/commentService";

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = parseInt(localStorage.getItem("userId"), 10);
    const nickname = localStorage.getItem("name");
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await getPostById(id);
            setPost(response.data);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await getComments(id);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment) return;
        try {
            await addComment({ post: { id }, content: newComment, authorId: userId, author: nickname });
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("댓글 작성 실패:", error);
        }
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment.id);
        setEditedCommentText(comment.content);
    };

    const handleUpdateComment = async (commentId) => {
        try {
            await updateComment(commentId, { content: editedCommentText, authorId: userId });
            setEditingComment(null);
            fetchComments();
        } catch (error) {
            console.error("댓글 수정 실패:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, userId);
            fetchComments();
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
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
                        게시글 상세보기
                    </Typography>
                </Toolbar>
            </AppBar>

            {post && (
                <>
                    <Typography variant="h4">{post.title}</Typography>
                    <Typography>{post.content}</Typography>
                    <Typography variant="subtitle1">작성자: {post.author}</Typography>

                    {/* 댓글 목록 */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>댓글</Typography>
                    <List>
                        {comments.map((comment) => (
                            <ListItem key={comment.id}>
                                {editingComment === comment.id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            value={editedCommentText}
                                            onChange={(e) => setEditedCommentText(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateComment(comment.id)}>수정 완료</Button>
                                    </>
                                ) : (
                                    <>
                                        <ListItemText primary={comment.content} secondary={comment.author} />
                                        {comment.authorId === userId && (
                                            <>
                                                <IconButton onClick={() => handleEditComment(comment)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </>
                                )}
                            </ListItem>
                        ))}
                    </List>

                    {/* 댓글 입력 */}
                    <TextField label="댓글 입력" fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <Button onClick={handleAddComment}>댓글 작성</Button>
                </>
            )}
        </Container>
    );
};

export default PostDetailPage;
