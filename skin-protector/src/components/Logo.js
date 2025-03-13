import React from "react";
import { Box } from "@mui/material";

const Logo = ({ src, alt }) => {
    return <Box component="img" src={src} alt={alt} sx={{ width: "80px", height: "80px", marginBottom: "20px" }} />;
};

export default Logo;
