package org.zerock.server_member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  //전체보기
  public List<Member> list(){
    return memberRepository.findAll();
  }
  //추가
  public Member insert(Member member){
    return  memberRepository.save(member);
  }
  //삭제
  public void delete(Long id){
    memberRepository.deleteById(id);
  }
  //수정
  @Transactional
  public Member update(Long id, Member member){
    Member m = memberRepository.findById(id).get();
    m.setName(member.getName());   //member <- 수정 정보 객체
    m.setEmail(member.getEmail());
    m.setPhone(member.getPhone());
    return m;
  }
}
