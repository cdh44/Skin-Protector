package com.example.androidproject1

import android.content.DialogInterface
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.RecyclerView
import com.example.androidproject1.databinding.ActivitySignupPageBinding
import com.example.androidproject1.databinding.ItemMemberBinding
import retrofit2.Call
import retrofit2.Response

class MemberAdapter(var memberList:MutableList<Member> )
    :RecyclerView.Adapter<MemberAdapter.MemberHolder>() {
    class MemberHolder(val  itemMemberBinding: ItemMemberBinding)
        :RecyclerView.ViewHolder(itemMemberBinding.root) {

    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MemberHolder {
        return MemberHolder(ItemMemberBinding.inflate(LayoutInflater.from(parent.context),
            parent,false))
    }
    override fun getItemCount(): Int  = memberList.size
    override fun onBindViewHolder(holder: MemberHolder, position: Int) {
        val member = memberList[position]
        holder.itemMemberBinding.txtId.text = member.id.toString()
        holder.itemMemberBinding.txtName.text = member.name
        holder.itemMemberBinding.txtPhone.text = member.phone
        holder.itemMemberBinding.txtEmail.text = member.email

        //수정(클릭)
        holder.itemView.setOnClickListener {
           //dialog 창 띄워 수정할 데이터 보여주고
            val dialog = ActivitySignupPageBinding.inflate(LayoutInflater.from(it.context))
            AlertDialog.Builder(it.context).run {
                setTitle("수정")
                setView(dialog.root)
                dialog.editName.setText(member.name)
                dialog.editPhone.setText(member.phone)
                dialog.editEmail.setText(member.email)
                dialog.txtSignup.visibility = View.GONE
                dialog.btnSignupConfirm.visibility = View.GONE

                setPositiveButton("수정",
                    //수정버튼 클릭하면 디비 내용 수정하고
                    object:DialogInterface.OnClickListener{
                        override fun onClick(p0: DialogInterface?, p1: Int) {
                            val m = Member(member.id,   //m 수정할 Member
                                dialog.editName.text.toString(),
                                dialog.editPhone.text.toString(),
                                dialog.editEmail.text.toString())
                            Client.retrofit.update(member.id!!,m).enqueue(object:retrofit2.Callback<Member>{
                                override fun onResponse(
                                    call: Call<Member>,
                                    response: Response<Member>
                                ) {
                                    // 리사이클러뷰(어댑터) 내용 수정
                                    memberList[holder.adapterPosition] = response.body()!!
                                    notifyDataSetChanged()
                                }

                                override fun onFailure(call: Call<Member>, t: Throwable) {

                                }

                            })
                        }
                    }
                )
                setNegativeButton("취소",null)
                show()
            }
        }

        //삭제(롱클릭)
        holder.itemView.setOnLongClickListener {
            AlertDialog.Builder(it.context).run {
                setTitle("삭제!!!")
                setMessage("정말 삭제할까요???")
                setPositiveButton("삭제",object:DialogInterface.OnClickListener{
                    override fun onClick(p0: DialogInterface?, p1: Int) {
                        //spring  서버와 연결하여 디비 내용 삭제
                        Client.retrofit.delete(member.id!!).enqueue(object:retrofit2.Callback<Void>{
                            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                                //리사이클러뷰(어댑터) 삭제
                                memberList.removeAt(holder.adapterPosition)
                                notifyDataSetChanged()
                            }

                            override fun onFailure(call: Call<Void>, t: Throwable) {

                            }
                        })
                    }
                })
                setNegativeButton("취소",null)
                show()
            }

            false
        }

    }
}