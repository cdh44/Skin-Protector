package com.example.androidproject1

import android.content.DialogInterface
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.RecyclerView
import com.example.androidproject1.databinding.ItemCosmeticBinding
import retrofit2.Call
import retrofit2.Response

class ItemAdapter(var itemList:MutableList<Item>)
    :RecyclerView.Adapter<ItemAdapter.Holder>() {
        //인터페이스
        interface OnItemClickListener {
            fun onUpdateClick(item:Item, position: Int)
        }
    var onItemClickListener:OnItemClickListener ?= null
    class Holder(val itemCosmeticBinding: ItemCosmeticBinding)
        :RecyclerView.ViewHolder(itemCosmeticBinding.root) {

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        return  Holder(ItemCosmeticBinding.inflate(LayoutInflater.from(parent.context),
            parent,false))
    }

    override fun getItemCount(): Int  = itemList.size

    override fun onBindViewHolder(holder: Holder, position: Int) {
       val item = itemList[position]
        holder.itemCosmeticBinding.txtID.text = item.id.toString()
        holder.itemCosmeticBinding.txtCosmeticName.text = item.name
        holder.itemCosmeticBinding.txtCategory.text = item.category
        holder.itemCosmeticBinding.txtReleaseDate.text = item.releaseDate
        holder.itemCosmeticBinding.txtExpirationDate.text = item.expirationDate
        //수정(클릭) -> 인터페이스 이용
        holder.itemView.setOnClickListener {
            onItemClickListener?.onUpdateClick(item, position)
        }

        //삭제(롱클릭)
        holder.itemView.setOnLongClickListener {
            AlertDialog.Builder(it.context).run {
                setTitle("정말 삭제할까요?")
                setPositiveButton("삭제", object:DialogInterface.OnClickListener{
                    override fun onClick(p0: DialogInterface?, p1: Int) {
                       // 1. db에서 삭제
                        Client.retrofit.remove(item.id!!).enqueue(object:retrofit2.Callback<Void>{
                            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                                //2. 리사이클러뷰(어댑터) 에서 삭제
                                itemList.removeAt(holder.adapterPosition)
                                notifyDataSetChanged()
                            }
                            override fun onFailure(call: Call<Void>, t: Throwable) {
                                Log.d("deleteOnFailure : ", t.localizedMessage)
                            }
                        })
                    }
                })
                setNegativeButton("취소", null)
                show()
            }
            false
        }
    }
}