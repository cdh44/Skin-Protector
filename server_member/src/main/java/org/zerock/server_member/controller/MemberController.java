package org.zerock.server_member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.service.MemberService;

import java.util.List;

//Controller -> Service - >Repository ->DB
@RestController // @Controller + @ResponseBody
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;
   //전체보기
  @GetMapping("/list")
  public List<Member> list() {
    return  memberService.list();
  }
  //추가
  @PostMapping("/insert")
  public Member insert(@RequestBody Member member){
    return memberService.insert(member);
  }
  //삭제
  @DeleteMapping("/delete/{id}")
  public void delete(@PathVariable Long id) {
    memberService.delete(id);
  }
  //수정
  @PutMapping("/update/{id}")
  public Member update(@PathVariable Long id, @RequestBody Member member) {
    return  memberService.update(id, member);
  }
}
