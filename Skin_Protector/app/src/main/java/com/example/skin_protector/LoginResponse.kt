package com.example.skin_protector

data class LoginResponse(
    val id: String,
    val nickname: String,
    val token: String  // 서버에서 JWT 토큰을 발급할 경우
)
