package com.example.skin_protector

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.skin_protector.databinding.ActivityMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_main)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        //로그인 버튼
        binding.btnLogin.setOnClickListener { login() }
        //회원 가입 버튼
        binding.btnSignup.setOnClickListener { signup() }


    }

    private fun signup() {
        startActivity(Intent(this,SignupActivity::class.java))
    }

    private fun login() {
        val id = binding.edtID.text.toString().trim()
        val password = binding.edtPW.text.toString().trim()

        if (id.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "아이디와 비밀번호를 입력하세요.", Toast.LENGTH_SHORT).show()
            return
        }

        val loginRequest = LoginRequest(id, password)

        RetrofitClient.instance.login(loginRequest).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    Toast.makeText(
                        this@MainActivity,
                        "Welcome ${loginResponse?.nickname}",
                        Toast.LENGTH_SHORT
                    ).show()
//                    startActivity(Intent(this@MainActivity, HomePage::class.java))
                } else {
                    Toast.makeText(this@MainActivity, "로그인 실패!", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Toast.makeText(this@MainActivity, "서버 오류 발생!", Toast.LENGTH_SHORT).show()
            }
        })
    }

}