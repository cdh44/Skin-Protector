import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = ({ backPath }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => navigate(backPath)}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">뒤로</Typography>
        </Box>
    );
};

export default BackButton;
