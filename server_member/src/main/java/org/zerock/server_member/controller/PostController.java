package org.zerock.server_member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Post;
import org.zerock.server_member.service.PostService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 게시글 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 게시글 작성
    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    // 게시글 수정 (작성자 확인)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        boolean success = postService.updatePost(id, updatedPost);
        return success ? ResponseEntity.ok("게시글이 수정되었습니다.") : ResponseEntity.status(403).body("수정 권한이 없습니다.");
    }

    // 게시글 삭제 (작성자 확인)
    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, @PathVariable Long userId) {
        boolean success = postService.deletePost(id, userId);
        return success ? ResponseEntity.ok("게시글이 삭제되었습니다.") : ResponseEntity.status(403).body("삭제 권한이 없습니다.");
    }
}
