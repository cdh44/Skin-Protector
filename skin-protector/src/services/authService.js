import api from '../api';

// 회원가입 요청
export const signup = async (member) => {
    return api.post("/member/insert", member);
};

// 로그인 API 요청
export const login = async (id, password) => {
    try {
        const response = await api.post("/member/login", { email: id, password });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        const { id: userId, name, token } = response.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);

        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error.response?.data?.error || error.message);
        throw new Error(error.response?.data?.error || "로그인 중 문제가 발생했습니다.");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
};
