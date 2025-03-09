package com.example.cosmeticproject

import com.google.gson.annotations.SerializedName

data class Member(
    val id: String,             // 이메일(아이디) - 필수
    val password: String,       // 비밀번호 - 필수
    val nickname: String? = null, // 닉네임 - 선택
    val phone: String? = null,  // 전화번호 - 선택
    val birthYear: String? = null,  // 생년 - 선택
    val birthMonth: String? = null, // 생월 - 선택
    val birthDay: String? = null    // 생일 - 선택
)

