package com.example.androidproject1

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.androidproject1.databinding.ActivityHomeBinding
import com.example.androidproject1.databinding.ActivityMyPageBinding
import retrofit2.Call
import retrofit2.Response

class MyPage : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_my_page)
        val binding = ActivityMyPageBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        binding.btnBack.setOnClickListener { finish() }
        //1. 데이터 생성
        var memberList = mutableListOf<Member>()
        //2. 어댑터 생성
        val memberAdapter= MemberAdapter(memberList)
        //3. 리사이클러뷰와 어댑터 연결
        binding.recyclerView.adapter = memberAdapter
        //4. 리사이클러뷰 레이아웃 설정
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        //구분선
        binding.recyclerView.addItemDecoration(
            DividerItemDecoration(this,
            LinearLayoutManager(this).orientation)
        )

        //전체보기
        Client.retrofit.list().enqueue(object:retrofit2.Callback<List<Member>>{
            override fun onResponse(call: Call<List<Member>>, response: Response<List<Member>>) {
                //결과 값을 리사이클러뷰에 추가하기
                memberAdapter.memberList = response.body() as MutableList<Member>
                memberAdapter.notifyDataSetChanged()
            }

            override fun onFailure(call: Call<List<Member>>, t: Throwable) {

            }

        })
    }
}