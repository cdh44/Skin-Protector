import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../services/authService";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 모든 localStorage 데이터 삭제
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* 오른쪽 상단 로고 */}
      <img src="/images/cosmetic.png" alt="cosmetic" className="home-logo" />

      {/* 중앙 텍스트 */}
      <h2 className="home-title">홈</h2>

      {/* 버튼 리스트 */}
      <button className="home-button community-btn" onClick={() => navigate("/community")}>
        커뮤니티
      </button>

      <button className="home-button mypage-btn" onClick={() => navigate("/mypage")}>
        마이 페이지
      </button>

      <button className="home-button logout-btn" onClick={handleLogout}>
        <LogoutIcon className="logout-icon" /> 로그아웃
      </button>

      {/* 오른쪽 하단 알림 아이콘 */}
      <img src="/images/alert.png" alt="alert" className="home-alert" />
    </div>
  );
};

export default HomePage;
