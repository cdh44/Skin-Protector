package org.zerock.server_member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.service.MemberService;

import java.util.List;
import java.util.Optional;

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

  // 로그인 (이메일 + 비밀번호 확인)
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Member loginRequest) {
    Optional<Member> member = memberService.findByEmail(loginRequest.getEmail());

    if (member.isPresent() && member.get().getPassword().equals(loginRequest.getPassword())) {
      return ResponseEntity.ok("로그인 성공!");  // ✅ 실제 구현에서는 JWT 토큰을 반환하는 것이 좋음
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 이메일 또는 비밀번호가 틀렸습니다.");
    }
  }
}
