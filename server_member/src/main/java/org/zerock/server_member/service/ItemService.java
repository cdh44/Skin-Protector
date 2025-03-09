package org.zerock.server_member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.zerock.server_member.model.Item;
import org.zerock.server_member.repository.ItemRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    //전체보기
    public List<Item> list(){
        return itemRepository.findAll();
    }
    //추가
    public Item insert(Item item){
        return  itemRepository.save(item);
    }
    //삭제
    @Transactional
    public void delete(Long id){
        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다: " + id);
        }
        itemRepository.deleteById(id);
    }

    //수정
    @Transactional
    public Item update(Long id, Item member){
        Item i = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다: " + id));

        i.setName(member.getName());   //member <- 수정 정보 객체
        i.setCategory(member.getCategory());
        i.setReleaseDate(member.getReleaseDate());
        i.setExpirationDate(member.getExpirationDate());
        return i;
    }

}
