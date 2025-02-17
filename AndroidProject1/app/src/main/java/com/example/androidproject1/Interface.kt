package com.example.androidproject1

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface Interface {
    //전체보기
    @GET("item/list")
    fun findAll():Call<List<Item>>
    //추가
    @POST("item/insert")
    fun insert(@Body item:Item):Call<Item>
    //수정
    @PUT("item/update/{id}")
    fun updateItem(@Path("id") id: Long,@Body item: Item):Call<Item>
    //삭제  http://10.100.104.53:8814/item/delete/{id}
    @DELETE("item/delete/{id}")
    fun remove(@Path("id") id:Long):Call<Void>

    //전체보기
    @GET("member/list")
    fun list():Call<List<Member>>
    //추가
    @POST("member/insert")
    fun save(@Body member:Member):Call<Member>
    //수정
    @PUT("member/update/{id}")
    fun update(@Path("id") id:Long, @Body member: Member):Call<Member>
    //삭제
    @DELETE("member/delete/{id}")
    fun delete(@Path("id") id:Long):Call<Void>
}