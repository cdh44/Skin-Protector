package com.example.skin_protector


import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface MemberApi {
    @POST("member") // <-- 슬래시 제거
    fun signup(@Body member: Member): Call<Member>

    @PUT("member/update/{id}")
    fun update(@Path("id") id: Long, @Body member: Member): Call<Member>

    @DELETE("member/delete/{id}")
    fun remove(@Path("id") id: Long): Call<Void>

    @POST("member/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

}
