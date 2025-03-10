import api from '../api';

// 전체 아이템 목록 조회
export const getItems = async () => {
    return api.get("/item/list");
};

// 아이템 추가
export const addItem = async (item) => {
    return api.post("/item/insert", item);
};

// 아이템 수정
export const updateItem = async (id, item) => {
    return api.put(`/item/update/${id}`, item);
};

// 아이템 삭제
export const deleteItem = async (id) => {
    return api.delete("/item/delete", { data: { id } });
};
