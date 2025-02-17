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
    public void delete(Long id){
        itemRepository.deleteById(id);
    }
    //수정
    @Transactional
    public Item update(Long id, Item member){
        Item i = itemRepository.findById(id).get();
        i.setName(member.getName());   //member <- 수정 정보 객체
        i.setCategory(member.getCategory());
        i.setReleaseDate(member.getReleaseDate());
        i.setExpirationDate(member.getExpirationDate());
        return i;
    }
}
