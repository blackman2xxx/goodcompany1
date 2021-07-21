import {useState, useEffect} from 'react';
import {addCompany, getCompanies, getCompaniesActive, removeCompany, updateCompany} from '../config/firebase';

function useCoStorage() {
    const [items, setItems] = useState([]);
    const [itemsActive, setItemsActive] = useState([]);
    useEffect(() => {
        getItems();
        getItemsActive();
    }, []);

    const getItems = async () => {
        const _items = await getCompanies();
        setItems(_items);
    }
    const getItemsActive = async () => {
        const _items = await getCompaniesActive();
        setItemsActive(_items);
    }
    const addItem = async (item) => {
        await addCompany(item);
        setItems([...items, item]);
        setItemsActive([...itemsActive, item]);
    }

    const updateItem = async (item) => {
        await updateCompany(item);
        const _items = await getCompanies();
        const _itemsIsActive = await getCompaniesActive();
        setItems(_items);
        setItemsActive(_itemsIsActive);
    }

    const removeItem = async (item) => {
       await removeCompany(item);
       const _items = items.filter((x) => x.id !== item.id);
       setItems(_items);
       const _itemsIsActive = await getCompaniesActive();
       setItemsActive(_itemsIsActive);
    }
    return [items, addItem, updateItem, removeItem, itemsActive];
}

export default useCoStorage;
