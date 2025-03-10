import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // JWT 토큰 삭제
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
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <img src="/images/cosmetic.png" alt="Cosmetic" width={50} height={50} />
      </Box>

      <Typography variant="h4" gutterBottom>
        홈
      </Typography>

      {/* 커뮤니티 버튼 */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          bgcolor: "#8BC34A",
          color: "white",
          "&:hover": { bgcolor: "#7CB342" },
        }}
        onClick={() => navigate("/community")}
      >
        커뮤니티
      </Button>

      {/* 마이페이지 버튼 */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#70A43C",
          color: "white",
          "&:hover": { bgcolor: "#5F8A2D" },
        }}
        onClick={() => navigate("/mypage")}
      >
        마이 페이지
      </Button>

      {/* 로그아웃 버튼 */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#f44336",
          color: "white",
          "&:hover": { bgcolor: "#d32f2f" },
        }}
        onClick={handleLogout}
      >
        로그아웃
      </Button>

      <Box sx={{ position: "absolute", bottom: 80, right: 16 }}>
        <img src="/images/alert.png" alt="Alert" width={50} height={50} />
      </Box>
    </Container>
  );
};

export default HomePage;
