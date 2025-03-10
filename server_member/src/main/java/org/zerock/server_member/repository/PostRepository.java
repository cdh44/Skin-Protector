package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.server_member.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
