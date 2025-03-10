import api from '../api';

// 회원가입 요청
export const signup = async (member) => {
    return api.post("/member/insert", member);
};

// 로그인 API 요청
export const login = async (email, password) => {
    return api.post('/member/login', { email, password });
};