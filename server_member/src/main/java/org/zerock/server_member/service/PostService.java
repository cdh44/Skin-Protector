package org.zerock.server_member.service;

import org.springframework.stereotype.Service;
import org.zerock.server_member.model.Member;
import org.zerock.server_member.model.Post;
import org.zerock.server_member.repository.MemberRepository;
import org.zerock.server_member.repository.PostRepository;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public PostService(PostRepository postRepository, MemberRepository memberRepository) {
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }

    // 전체 게시글 목록 조회
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // 특정 게시글 상세 조회
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    // 게시글 작성
    public Post createPost(Post post) {
        Member member = memberRepository.findById(post.getAuthorId()).orElse(null);
        if (member != null) {
            post.setAuthor(member.getName());
        }
        return postRepository.save(post);
    }

    // 게시글 수정 (작성자만 가능)
    public boolean updatePost(Long id, Post updatedPost) {
        Optional<Post> existingPost = postRepository.findById(id);

        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            if (!post.getAuthorId().equals(updatedPost.getAuthorId())) {
                return false; // 수정 권한 없음
            }
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            postRepository.save(post);
            return true;
        }
        return false;
    }

    // 게시글 삭제 (작성자만 가능)
    public boolean deletePost(Long id, Long userId) {
        Optional<Post> existingPost = postRepository.findById(id);

        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            if (!post.getAuthorId().equals(userId)) {
                return false; // 삭제 권한 없음
            }
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
