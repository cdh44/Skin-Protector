package com.example.cosmeticproject

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface MemberApi {
    @POST("member/")
    fun signup(@Body member: Member): Call<Member> // 응답이 필요 없으면 Void 사용
    //수정
    @PUT("member/update/{id}")
    fun update(@Path("id") id: Long, @Body member: Member):Call<Member>
    //삭제  http://10.100.104.53:8814/member/delete/{id}
    @DELETE("member/delete/{id}")
    fun remove(@Path("id") id:Long):Call<Void>
}