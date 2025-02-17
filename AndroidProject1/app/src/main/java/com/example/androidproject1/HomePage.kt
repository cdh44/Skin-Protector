package com.example.androidproject1

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.androidproject1.databinding.ActivityHomeBinding

class HomePage : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_login)
        val binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        //로그아웃 버튼
        binding.btnLogout.setOnClickListener { finish() }
        //마이페이지 버튼
        binding.btnMyPage.setOnClickListener { myPage() }
        //커뮤니티 버튼
        binding.btnCommunity.setOnClickListener { community() }
    }

    private fun community() {
        startActivity(Intent(this, CommunityPage::class.java))
    }

    private fun myPage() {
        startActivity(Intent(this, MyPage::class.java))
    }
}