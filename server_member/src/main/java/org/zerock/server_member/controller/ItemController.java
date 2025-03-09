package org.zerock.server_member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.zerock.server_member.model.Item;
import org.zerock.server_member.service.ItemService;

import java.util.List;

@RestController // @Controller + @ResponseBody
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    //전체보기
    @GetMapping("/list")
    public List<Item> list() {
        return  itemService.list();
    }
    //추가
    @PostMapping("/insert")
    public Item insert(@RequestBody Item item){
        return itemService.insert(item);
    }
    //삭제
    @DeleteMapping("/delete")
    public void delete(@RequestBody Long id) {
        itemService.delete(id);
    }

    //수정
    @PutMapping("/update/{id}")
    public Item update(@PathVariable Long id, @RequestBody Item item) {
        return  itemService.update(id, item);
    }
}
