import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { getItems } from '../services/itemService';

const MyPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">내 화장품 관리</Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={`${item.name} (유통기한: ${item.expirationDate})`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={fetchItems}>새로고침</Button>
        </Container>
    );
};

export default MyPage;
