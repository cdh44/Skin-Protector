package com.example.cosmeticproject

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.cosmeticproject.databinding.ActivityMainBinding

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
//        binding.btnLogin.setOnClickListener { login() }
        //회원 가입 버튼
        binding.btnSignup.setOnClickListener { signup() }


    }

    private fun signup() {
        startActivity(Intent(this,SignupActivity::class.java))
    }

    /*private fun login() {
        val intent = Intent(this, HomePage::class.java)
        with(binding) {
//            val id = edtID.text.toString()
//            val pw = edtPW.text.toString()
            // 로그인 요청 데이터
            val loginRequest = LoginRequest(
                email = edtID.text.toString(),
                password = edtPW.text.toString()
            )
//            if (id.isNotEmpty() && pw.isNotEmpty()) {   //id,pw가 비어있지 않다면
//                val docRef = firestore.collection("members").document(id)
//                docRef.get()
//                    .addOnSuccessListener { document ->
//                        if (document != null) {
//                            if (document.data?.get("password") == pw) {
//                                Log.d("aa", "DocumentSnapshot data: ${document.data?.get("pw")}")
//                                Toast.makeText(this@MainActivity, "${id}님 어서오세요.", Toast.LENGTH_SHORT).show()
//                                startActivity(intent)
//                            } else {
//                                Log.d(
//                                    "pwerror",
//                                    "DocumentSnapshot data: ${document.data?.get("pw")}"
//                                )
//                                Toast.makeText(
//                                    this@MainActivity,
//                                    "로그인 실패(pw error)",
//                                    Toast.LENGTH_SHORT
//                                ).show()
//
//                            }
//                        } else {
//                            Log.d("bb", "No such document")
//                            Toast.makeText(
//                                this@MainActivity,
//                                "로그인 실패(id error)",
//                                Toast.LENGTH_SHORT
//                            ).show()
//
//                        }
//                    }
//MemberClient.retrofit.join(member).enqueue(object:retrofit2.Callback<Member> {
//                        override fun onResponse(call: Call<Member>, response: Response<Member>) {
//                            //  콜백 결과(Member)를 리사이클러뷰(어댑터) 추가  ==> MainActivity에서 해야 함
//                            Log.d("retrofit insert :", "${response.body()}")
//                            intent.putExtra("email", response.body()!!.email)
//                            intent.putExtra("password", response.body()!!.password)
//                            intent.putExtra("nickname", response.body()!!.nickname)
//                            intent.putExtra("phone", response.body()!!.phone)
//                            intent.putExtra("birthday", response.body()!!.birthday)
//                            setResult(RESULT_OK, intent)
//                            finish()
//                        }
//
//                        override fun onFailure(call: Call<Member>, t: Throwable) {
//                            Log.d("retrofit insert onFailure :", t.localizedMessage)
//                        }
//                    })
            if (loginRequest.email.isNotEmpty() && loginRequest.password.isNotEmpty()) {   //id,pw가 비어있지 않다면
                *//*MemberClient.retrofit.login(id, pw).enqueue(object :retrofit2.Callback<Member> {
                    override fun onResponse(call: Call<Member>, response: Response<Member>) {
                        if (response.isSuccessful) {
                            try {
                                Log.d("retrofit login : ", "${response.body()}")
                                startActivity(intent)
                            } catch (e: IOException) {
                                e.printStackTrace()
                            }
                        }
                    }

                    override fun onFailure(call: Call<Member>, t: Throwable) {
                         Log.d("retrofit login onFailure :", t.localizedMessage)
                    }
                })*//*

//                Log.d("login id,pw :" , "${loginRequest}")
//                MemberClient.retrofit.login(loginRequest).enqueue(object : Callback<LoginResponse> {
//                    override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
//                        if (response.isSuccessful) {
//                            val loginResponse = response.body()
//                            Toast.makeText(this@MainActivity, "Welcome ${loginResponse?.nickname}", Toast.LENGTH_LONG).show()
//                            // 성공 시 메인 화면으로 이동
//                             startActivity(Intent(this@MainActivity, LoginPage::class.java))
//                        } else {
//                            Log.d("login request", "email: ${loginRequest.email}, password: ${loginRequest.password}")
//
//                            Toast.makeText(this@MainActivity, "Login failed: ${response.message()}", Toast.LENGTH_LONG).show()
//                        }
//                    }
//
//                    override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
//                        Toast.makeText(this@MainActivity, "Error: ${t.message}", Toast.LENGTH_LONG).show()
//                    }
//                })
                startActivity(intent)
//                Toast.makeText(this@MainActivity, "${id}님 환영합니다.", Toast.LENGTH_SHORT).show()

            } else {
                Toast.makeText(this@MainActivity, "아이디,비밀번호를 모두 입력해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }*/
}