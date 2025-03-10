package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.server_member.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글의 댓글 목록 조회
    List<Comment> findByPostId(Long postId);
}
