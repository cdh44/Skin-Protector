import api from '../api';

// 전체 회원 목록 조회
export const getMembers = async () => {
    return api.get("/member/list");
};

// 회원 가입
export const signup = async (member) => {
    return api.post("/member/insert", member);
};

// 회원 정보 수정
export const updateMember = async (id, member) => {
    return api.put(`/member/update/${id}`, member);
};

// 회원 삭제
export const deleteMember = async (id) => {
    return api.delete(`/member/delete/${id}`);
};

// 로그인 요청
export const login = async (email, password) => {
    return api.post("/member/login", { email, password });
};
