import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BackButton.css"; // CSS 적용

const BackButton = ({ onClick }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <button className="back-button" onClick={onClick || (() => navigate(-1))}>
            ←
        </button>
    );
};

export default BackButton;
