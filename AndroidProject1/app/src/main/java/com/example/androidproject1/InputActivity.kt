package com.example.androidproject1

import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.androidproject1.databinding.ActivityInputBinding
import retrofit2.Call
import retrofit2.Response

class InputActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
       // setContentView(R.layout.activity_input)
        val inputBinding = ActivityInputBinding.inflate(layoutInflater)
        setContentView(inputBinding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        inputBinding.btnBack.setOnClickListener { finish() }

        //수정인지 추가인지 구분
        if (intent.getStringExtra("type").toString()=="update") {   //수정
            //intent로부터 값 받아와서 editText에 출력
            with(inputBinding) {
                button.text = "UPDATE"
                editName.setText(intent.getStringExtra("name"))
                editCategory.setText(intent.getStringExtra("category"))
                editReleaseDate.setText(intent.getStringExtra("releaseDate"))
                editExpirationDate.setText(intent.getStringExtra("expirationDate"))
            }
        } else {    //추가
            inputBinding.button.text = "ADD"
        }
        //추가 or 수정
        inputBinding.button.setOnClickListener { 
            //추가인지 수정인지 구분
            if (inputBinding.button.text == "ADD") {    //추가
                //추가
                val item = Item(null,
                    inputBinding.editName.text.toString(),
                    inputBinding.editCategory.text.toString(),
                    inputBinding.editReleaseDate.text.toString(),
                    inputBinding.editExpirationDate.text.toString())

                Client.retrofit.insert(item).enqueue(object:retrofit2.Callback<Item>{
                    override fun onResponse(call: Call<Item>, response: Response<Item>) {
                        //  콜백 결과(Item)를 리사이클러뷰(어댑터) 추가  ==> MainActivity에서 해야 함
                        Log.d("retrofit insert :", "${response.body()}")
                        intent.putExtra("name", response.body()!!.name)
                        intent.putExtra("category", response.body()!!.category)
                        intent.putExtra("releaseDate", response.body()!!.releaseDate)
                        intent.putExtra("expirationDate", response.body()!!.expirationDate)
                        intent.putExtra("id", response.body()!!.id)
                        setResult(RESULT_OK, intent)
                        finish()
                    }

                    override fun onFailure(call: Call<Item>, t: Throwable) {

                    }
                })
            } else {    //수정
                //1.수정된 내용을 가지고 스프링서버에 접속하여 update한 후
                val id = intent.getLongExtra("id",0)
                val item = Item(id,
                    inputBinding.editName.text.toString(),
                    inputBinding.editCategory.text.toString(),
                    inputBinding.editReleaseDate.text.toString(),
                    inputBinding.editExpirationDate.text.toString())
                Client.retrofit.updateItem(id, item).enqueue(object :retrofit2.Callback<Item> {
                    override fun onResponse(call: Call<Item>, response: Response<Item>) {
                        //2.수정된 Item로 리사이클러뷰(어댑터) 갱신
                        // -> MainActivity에 있음 intent에 담아서 리턴
                        intent.putExtra("id",response.body()!!.id)
                        intent.putExtra("name",response.body()!!.name)
                        intent.putExtra("category",response.body()!!.category)
                        intent.putExtra("releaseDate",response.body()!!.releaseDate)
                        intent.putExtra("expirationDate",response.body()!!.expirationDate)

                        intent.putExtra("pos", intent.getIntExtra("pos", 0))
                        intent.putExtra("type","update")
                        setResult(RESULT_OK,intent)
                        finish()
                    }

                    override fun onFailure(call: Call<Item>, t: Throwable) {
                        Log.d("retrofit onFailure",t.localizedMessage)
                    }

                })
            }

        }
    }
}