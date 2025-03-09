package com.example.cosmeticproject

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.cosmeticproject.databinding.ActivitySignupBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignupActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySignupBinding  // viewBinding 사용

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSignupConfirm.setOnClickListener {
            registerMember()
        }
    }

    private fun registerMember() {
        val id = binding.edtID.text.toString().trim()
        val password = binding.edtPassword.text.toString().trim()
        val passwordConfirm = binding.edtPasswordConfirm.text.toString().trim()
        val nickname = binding.edtNickname.text.toString().trim()
        val phone = binding.edtPhone.text.toString().trim()
        val birthYear = binding.signBirthYear.text.toString().trim()
        val birthMonth = binding.signBirthMonth.text.toString().trim()
        val birthDay = binding.signBirthDay.text.toString().trim()

        // 비밀번호 확인 체크
        if (password != passwordConfirm) {
            Toast.makeText(this, "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            return
        }

        // 필수 입력값 체크
        if (id.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty()) {
            Toast.makeText(this, "필수 항목을 입력해주세요.", Toast.LENGTH_SHORT).show()
            return
        }

        // Member 객체 생성
        val member = Member(
            id = id,
            password = password,
            nickname = if (nickname.isNotEmpty()) nickname else null,
            phone = if (phone.isNotEmpty()) phone else null,
            birthYear = if (birthYear.isNotEmpty()) birthYear else null,
            birthMonth = if (birthMonth.isNotEmpty()) birthMonth else null,
            birthDay = if (birthDay.isNotEmpty()) birthDay else null
        )
        Log.d("member data : ", "$member")
        // Retrofit을 이용한 회원가입 요청
        RetrofitClient.instance.signup(member).enqueue(object : Callback<Member> {
            override fun onResponse(call: Call<Member>, response: Response<Member>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@SignupActivity, "회원가입 성공!", Toast.LENGTH_SHORT).show()
                    finish() // 회원가입 후 액티비티 종료
                } else {
                    Toast.makeText(this@SignupActivity, "회원가입 실패!", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Member>, t: Throwable) {
                Toast.makeText(this@SignupActivity, "서버 오류 발생!", Toast.LENGTH_SHORT).show()
                Log.e("SignupActivity", "Error: ${t.message}")
            }
        })
    }
}
