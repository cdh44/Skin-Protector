import api from '../api';

// 전체 아이템 목록 조회
export const getItems = async () => {
    return api.get("/item/list");
};

// 아이템 추가 (파일 업로드 지원)
export const addItem = async (item, file) => {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("releaseDate", item.releaseDate);
    formData.append("expirationDate", item.expirationDate);
    if (file) {
        formData.append("file", file);
    }
    return api.post("/item/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

// 아이템 수정
export const updateItem = async (id, item) => {
    return api.put(`/item/update/${id}`, item);
};

// 아이템 삭제
export const deleteItem = async (id) => {
    return api.delete("/item/delete", { data: { id } });
};
