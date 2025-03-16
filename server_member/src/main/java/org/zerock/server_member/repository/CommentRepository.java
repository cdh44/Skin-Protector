package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.server_member.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글의 댓글 목록 조회
    List<Comment> findByPostId(Long postId);
    // 게시글 ID에 해당하는 댓글을 모두 삭제하는 메서드
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.post.id = :postId")
    void deleteByPostId(@Param("postId") Long postId);
}
