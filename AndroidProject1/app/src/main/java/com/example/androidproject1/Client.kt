package com.example.androidproject1

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object Client {
    val retrofit:Interface = Retrofit.Builder()
        .baseUrl("http://10.100.104.53:8814/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(Interface::class.java)
}