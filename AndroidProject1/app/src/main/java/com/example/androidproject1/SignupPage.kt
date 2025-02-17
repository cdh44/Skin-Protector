package com.example.androidproject1

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.androidproject1.databinding.ActivitySignupPageBinding
import retrofit2.Call
import retrofit2.Response

class SignupPage : AppCompatActivity() {
    private lateinit var binding: ActivitySignupPageBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_signup_page)
        binding = ActivitySignupPageBinding.inflate(layoutInflater)
        setContentView(binding.root)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        binding.btnBack.setOnClickListener { finish() }
        binding.btnSignupConfirm.setOnClickListener {
            val name = binding.editName.text.toString().trim()
            val phone = binding.editPhone.text.toString().trim()
            val email = binding.editEmail.text.toString().trim()
            //추가
            val member = Member(null,
                name,
                phone,
                email)
            // 필수 입력값 체크
            if (name.isEmpty() || phone.isEmpty() || email.isEmpty()) {
                Toast.makeText(this, "모두 입력해주세요.", Toast.LENGTH_SHORT).show()
            } else {
                Client.retrofit.save(member).enqueue(object:retrofit2.Callback<Member>{
                    override fun onResponse(call: Call<Member>, response: Response<Member>) {
                        //  콜백 결과(Member)를 리사이클러뷰(어댑터) 추가  ==> MainActivity에서 해야 함
                        Log.d("retrofit insert :", "${response.body()}")
                        intent.putExtra("name", response.body()!!.name)
                        intent.putExtra("phone", response.body()!!.phone)
                        intent.putExtra("email", response.body()!!.email)
                        intent.putExtra("id", response.body()!!.id)
                        setResult(RESULT_OK, intent)
                        Toast.makeText(this@SignupPage, "회원가입 성공!", Toast.LENGTH_SHORT).show()
                        finish()
                    }

                    override fun onFailure(call: Call<Member>, t: Throwable) {
                        Toast.makeText(this@SignupPage, "회원가입 실패", Toast.LENGTH_SHORT).show()
                    }
                })
            }
        }
    }
}