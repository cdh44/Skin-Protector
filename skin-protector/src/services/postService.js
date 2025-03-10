import api from "../api";

// 전체 게시글 목록 조회
export const getPosts = async () => {
    return api.get("/post/list");
};

// 특정 게시글 상세 조회
export const getPostById = async (id) => {
    return api.get(`/post/${id}`);
};

// 게시글 작성
export const createPost = async (post) => {
    return api.post("/post/create", post);
};

// 게시글 수정 (작성자만 가능)
export const updatePost = async (id, post) => {
    return api.put(`/post/update/${id}`, post);
};

// 게시글 삭제 (작성자만 가능)
export const deletePost = async (id, userId) => {
    return api.delete(`/post/delete/${id}/${userId}`);
};
