package org.zerock.server_member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.service.MemberService;

import java.util.List;
import java.util.Map;
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
        return memberService.list();
    }

    //추가
    @PostMapping("/insert")
    public Member insert(@RequestBody Member member) {
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
        return memberService.update(id, member);
    }

    // 로그인 (이메일 + 비밀번호 확인)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "이메일 또는 비밀번호가 없습니다."));
            }

            Member member = memberService.authenticate(email, password);
            if (member == null) {
                return ResponseEntity.status(401).body(Map.of("error", "이메일 또는 비밀번호가 올바르지 않습니다."));
            }

            String token = memberService.generateToken(member);
            return ResponseEntity.ok(Map.of(
                    "id", member.getId(),
                    "name", member.getName(),
                    "token", token
            ));
        } catch (Exception e) {
            e.printStackTrace(); // 콘솔에 오류 출력
            return ResponseEntity.status(500).body(Map.of("error", "서버 내부 오류 발생"));
        }
    }
}
