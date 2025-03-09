package org.zerock.server_member.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
}