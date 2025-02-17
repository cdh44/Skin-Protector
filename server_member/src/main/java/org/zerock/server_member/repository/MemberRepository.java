package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.server_member.model.Member;

public interface MemberRepository
    extends JpaRepository <Member, Long> {
}
