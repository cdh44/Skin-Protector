package org.zerock.server_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.server_member.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
