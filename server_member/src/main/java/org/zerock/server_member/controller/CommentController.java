package org.zerock.server_member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Comment;
import org.zerock.server_member.service.CommentService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 특정 게시글의 댓글 목록 조회
    @GetMapping("/list/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // 댓글 작성
    @PostMapping("/create")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.addComment(comment));
    }

    // 댓글 수정 (작성자 확인)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        boolean success = commentService.updateComment(id, updatedComment);
        return success ? ResponseEntity.ok("댓글이 수정되었습니다.") : ResponseEntity.status(403).body("수정 권한이 없습니다.");
    }

    // 댓글 삭제 (작성자 확인)
    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id, @PathVariable Long userId) {
        boolean success = commentService.deleteComment(id, userId);
        return success ? ResponseEntity.ok("댓글이 삭제되었습니다.") : ResponseEntity.status(403).body("삭제 권한이 없습니다.");
    }
}
