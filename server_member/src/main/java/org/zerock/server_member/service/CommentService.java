package org.zerock.server_member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.zerock.server_member.model.Comment;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.repository.CommentRepository;
import org.zerock.server_member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment addComment(Comment comment) {
        Member member = memberRepository.findById(comment.getAuthorId()).orElse(null);
        if (member != null) {
            comment.setAuthor(member.getName());
        }
        return commentRepository.save(comment);
    }

    public boolean updateComment(Long id, Comment updatedComment) {
        Optional<Comment> existingComment = commentRepository.findById(id);

        if (existingComment.isPresent()) {
            Comment comment = existingComment.get();
            if (!comment.getAuthorId().equals(updatedComment.getAuthorId())) {
                return false; // 수정 권한 없음
            }
            comment.setContent(updatedComment.getContent());
            commentRepository.save(comment);
            return true;
        }
        return false;
    }

    public boolean deleteComment(Long id, Long userId) {
        Optional<Comment> existingComment = commentRepository.findById(id);

        if (existingComment.isPresent()) {
            Comment comment = existingComment.get();
            if (!comment.getAuthorId().equals(userId)) {
                return false; // 삭제 권한 없음
            }
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
