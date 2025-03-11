package org.zerock.server_member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.repository.MemberRepository;
import org.zerock.server_member.util.JwtUtil;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final JwtUtil jwtUtil;

  //전체보기
  public List<Member> list(){
    return memberRepository.findAll();
  }
  //추가
  public Member insert(Member member){
    return  memberRepository.save(member);
  }
  //삭제
  @Transactional
  public void delete(Long id){
    if (!memberRepository.existsById(id)) {
      throw new IllegalArgumentException("해당 ID의 멤버가 존재하지 않습니다: " + id);
    }
    memberRepository.deleteById(id);
  }

  //수정
  @Transactional
  public Member update(Long id, Member member){
    Member m = memberRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 멤버가 존재하지 않습니다: " + id));

    m.setName(member.getName());   //member <- 수정 정보 객체
    m.setEmail(member.getEmail());
    m.setPhone(member.getPhone());
    return m;
  }

  // 이메일로 회원 찾기
  public Optional<Member> findByEmail(String email) {
    return memberRepository.findByEmail(email);
  }

  public Member authenticate(String email, String password) {
    Optional<Member> member = memberRepository.findByEmail(email);

    // 존재하지 않는 이메일 또는 비밀번호가 틀린 경우
    if (member.isEmpty() || !member.get().getPassword().equals(password)) {
      return null;
    }
    return member.get();
  }

  public String generateToken(Member member) {
    return jwtUtil.createToken(member.getEmail(), member.getId());
  }
}
