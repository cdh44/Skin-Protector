import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../services/postService";
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

            // 기존 게시글 데이터를 수정 모드에서도 사용하도록 설정
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
                    {isEditing ? (
                        <>
                            <TextField fullWidth margin="normal" label="제목" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                            <TextField fullWidth margin="normal" multiline rows={4} label="내용" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                            <Button variant="contained" sx={{ mt: 2, bgcolor: "#8BC34A" }} onClick={handleEditPost}>
                                <SaveIcon /> 저장
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{post.title}</Typography>
                            <Typography>{post.content}</Typography>
                            <Typography variant="subtitle1">작성자: {post.author}</Typography>
                        </>
                    )}

                    {/* 게시글 작성자만 수정/삭제 버튼 표시 */}
                    {post.authorId === userId && !isEditing && (
                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            <Button variant="outlined" color="primary" onClick={() => {
                                setIsEditing(true);
                                setEditedTitle(post.title); // 기존 제목 표시
                                setEditedContent(post.content); // 기존 내용 표시
                            }}>
                                <EditIcon /> 수정
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleDeletePost}>
                                <DeleteIcon /> 삭제
                            </Button>
                        </Box>
                    )}

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
