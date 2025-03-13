import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 모든 localStorage 데이터 삭제
    navigate("/");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* 오른쪽 상단 로고 */}
      <Box
        component="img"
        src="/images/cosmetic.png"
        alt="cosmetic"
        sx={{
          width: 50,
          height: 50,
          position: "absolute",
          top: 16,
          right: 16,
        }}
      />

      {/* 중앙 텍스트 */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        홈
      </Typography>

      {/* 버튼 리스트 */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2, bgcolor: "#A4D37E" }}
        onClick={() => navigate("/community")}
      >
        커뮤니티
      </Button>

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2, bgcolor: "#649A3A" }}
        onClick={() => navigate("/mypage")}
      >
        마이 페이지
      </Button>

      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => {
            handleLogout();
        }}
      >
        로그아웃
      </Button>

      {/* 오른쪽 하단 알림 아이콘 */}
      <Box
        component="img"
        src="/images/alert.png"
        alt="alert"
        sx={{
          width: 50,
          height: 50,
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      />
    </Container>
  );
};

export default HomePage;
