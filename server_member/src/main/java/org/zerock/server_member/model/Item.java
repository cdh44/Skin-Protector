package org.zerock.server_member.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    // 이미지 파일 경로 (예: URL 또는 로컬 저장 경로)
    @Column(name = "image_url")
    private String imageUrl;
}