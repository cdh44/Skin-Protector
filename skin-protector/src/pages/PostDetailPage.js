import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, ListItemText, IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../services/postService";
import { getComments, addComment, updateComment, deleteComment } from "../services/commentService";
import "../styles/PostDetailPage.css";

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = parseInt(localStorage.getItem("userId"), 10);
    const nickname = localStorage.getItem("name");
    const [post, setPost] = useState([null]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await getPostById(id);
            setPost(response.data);
            setEditedTitle(response.data.title);
            setEditedContent(response.data.content);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        }
    };

    const handleEditPost = async () => {
        try {
            await updatePost(id, { title: editedTitle, content: editedContent, authorId: userId });
            setIsEditing(false);
            fetchPost();
        } catch (error) {
            console.error("게시글 수정 실패:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleDeletePost = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost(id, userId);
                navigate("/community");
            } catch (error) {
                console.error("게시글 삭제 실패:", error);
            }
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
        <div className="post-detail-container">
            {/* 상단 네비게이션 바 */}
            <div className="navbar">
                <IconButton edge="start" onClick={() => navigate("/community")} sx={{ color: "black" }}>
                    <ArrowBackIcon />
                </IconButton>
                <h2 className="navbar-title">게시글 상세보기</h2>
                <img src="/images/cosmetic.png" alt="Logo" className="navbar-logo" />
            </div>

            {post && (
                <>
                    {isEditing ? (
                        <div className="edit-mode">
                            <TextField fullWidth margin="normal" label="제목" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                            <TextField fullWidth margin="normal" multiline rows={4} label="내용" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                            <Box className="edit-buttons">
                                <Button variant="contained" className="save-button" onClick={handleEditPost}>
                                    <SaveIcon /> 저장
                                </Button>
                                <Button variant="outlined" color="secondary" className="cancel-button" onClick={handleCancelEdit}>
                                    <CancelIcon /> 취소
                                </Button>
                            </Box>
                        </div>
                    ) : (
                        <div className="post-content">
                            <Typography variant="h4">{post.title}</Typography>
                            <Typography>{post.content}</Typography>
                            <Typography variant="subtitle1">작성자: {post.author}</Typography>
                        </div>
                    )}

                    {post.authorId === userId && !isEditing && (
                        <Box className="edit-delete-buttons">
                            <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)}>
                                <EditIcon /> 수정
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleDeletePost}>
                                <DeleteIcon /> 삭제
                            </Button>
                        </Box>
                    )}

                    <Typography variant="subtitle1" className="comment-title">댓글</Typography>
                    <List className="comment-list">
                        {comments.map((comment) => (
                            <ListItem key={comment.id} className="comment-item">
                                {editingComment === comment.id ? (
                                    <div className="comment-edit-container">
                                        {/* TextField의 fullWidth 제거 (또는 flex: 1로 조정) */}
                                        <TextField
                                            value={editedCommentText}
                                            onChange={(e) => setEditedCommentText(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateComment(comment.id)}>
                                            수정 완료
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <ListItemText primary={comment.content} secondary={comment.author} />
                                        {comment.authorId === userId && (
                                            <Box className="comment-actions">
                                                <IconButton onClick={() => handleEditComment(comment)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </ListItem>
                        ))}
                    </List>

                    <TextField className="comment-input" label="댓글 입력" fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <Button className="comment-submit-button" onClick={handleAddComment}>댓글 작성</Button>
                </>
            )}
        </div>
    );
};

export default PostDetailPage;
