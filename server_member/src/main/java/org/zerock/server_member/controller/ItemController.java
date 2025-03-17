package org.zerock.server_member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.server_member.model.Item;
import org.zerock.server_member.service.ItemService;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController // @Controller + @ResponseBody
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    @Value("${file.upload.dir}")
    private String uploadDir;

    //전체보기
    @GetMapping("/list")
    public List<Item> list() {
        return  itemService.list();
    }

    @PostMapping(value = "/insert", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Item insert(@ModelAttribute Item item, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            File uploadFile = new File(uploadDir, fileName);
            if (!uploadFile.getParentFile().exists()) {
                uploadFile.getParentFile().mkdirs();
            }
            file.transferTo(uploadFile);
            item.setImageUrl("/uploads/" + fileName);
        }
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
