package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.server_member.model.Member;

import java.util.Optional;

public interface MemberRepository
    extends JpaRepository <Member, Long> {
    Optional<Member> findByEmail(String email);
}
