import api from "../api";

// 특정 게시글의 댓글 목록 조회
export const getComments = async (postId) => {
    return api.get(`/comment/list/${postId}`);
};

// 댓글 작성
export const addComment = async (comment) => {
    return api.post("/comment/create", comment);
};

// 댓글 수정 (작성자만 가능)
export const updateComment = async (id, comment) => {
    return api.put(`/comment/update/${id}`, comment);
};

// 댓글 삭제 (작성자만 가능)
export const deleteComment = async (id, userId) => {
    return api.delete(`/comment/delete/${id}/${userId}`);
};
