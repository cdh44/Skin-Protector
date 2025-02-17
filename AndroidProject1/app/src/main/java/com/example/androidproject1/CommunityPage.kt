package com.example.androidproject1

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.androidproject1.databinding.ActivityCommunityBinding
import retrofit2.Call
import retrofit2.Response

class CommunityPage : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_community)
        val binding = ActivityCommunityBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        binding.btnBack.setOnClickListener { finish() }
        //1.데이터생성
        var itemList = mutableListOf<Item>()
        //2.어댑터생성
        val itemAdapter = ItemAdapter(itemList)
        //3.리사이클러뷰와 어댑터 연결
        binding.recyclerView.adapter = itemAdapter
        //4.리사이클러뷰 레이아웃 설정
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        // 구분선
        binding.recyclerView.addItemDecoration(DividerItemDecoration(this,
            LinearLayoutManager.VERTICAL))
        //// 전체보기
        Client.retrofit.findAll().enqueue(object:retrofit2.Callback<List<Item>>{
            override fun onResponse(call: Call<List<Item>>, response: Response<List<Item>>) {
                itemAdapter.itemList = response.body() as MutableList<Item>
                itemAdapter.notifyDataSetChanged()
            }

            override fun onFailure(call: Call<List<Item>>, t: Throwable) {

            }

        })

        /////////
        val activityResultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()){
            if(it.resultCode == RESULT_OK){  // 인텐트 리턴값 처리
                //id, name, phone, email
                val id = it.data?.getLongExtra("id",0) ?: 0
                val name = it.data?.getStringExtra("name") ?: ""
                val category = it.data?.getStringExtra("category") ?: ""
                val releaseDate = it.data?.getStringExtra("releaseDate") ?: ""
                val expirationDate = it.data?.getStringExtra("expirationDate") ?: ""

                val pos = it.data?.getIntExtra("pos", 0) ?: 0
                val type = it.data?.getStringExtra("type") ?: ""

                //  콜백 결과(Item)를 리사이클러뷰(어댑터) 추가  ==> MainActivity에서 해야 함
                val item = Item(id, name, category, releaseDate, expirationDate)
                if (type == "update") { //수정
                    itemAdapter.itemList[pos] = item
                } else {    //추가
                    itemAdapter.itemList.add(item)
                }
                itemAdapter.notifyDataSetChanged()
            }
        }


        binding.floatingActionButton.setOnClickListener {
            val intent = Intent(this, InputActivity::class.java)
            // startActivity(intent)
            activityResultLauncher.launch(intent) //리턴값 있음

        }
        //수정
        itemAdapter.onItemClickListener = object :ItemAdapter.OnItemClickListener {
            override fun onUpdateClick(item: Item, position: Int) {
                //수정할 Item의 기존 데이터를 intent에 담아 InputActivity로 전달함
                val intent = Intent(this@CommunityPage,InputActivity::class.java)
                intent.putExtra("id",item.id)
                intent.putExtra("name",item.name)
                intent.putExtra("category", item.category)
                intent.putExtra("releaseDate", item.releaseDate)
                intent.putExtra("expirationDate", item.expirationDate)

                intent.putExtra("pos", position)
                intent.putExtra("type","update")
//                startActivity(intent)
                activityResultLauncher.launch(intent)   //리턴값 있음
            }

        }


    }
}