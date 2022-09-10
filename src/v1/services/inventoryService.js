const { v4: uuid } = require("uuid");
const Inventory = require("../../database/Inventory");

const getAllItems = () => {
    const allItems = Inventory.getAllItems();
    return allItems;
};

const getOneItem = (itemId) => {
    const item = Inventory.getOneItem(itemId);
    return item;
};

const addItem = (newItem) => {
    const itemToInsert = {
        ...newItem,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAT: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }

    try{
        const createdItem = Inventory.addItem(itemToInsert);
        return createdItem;
    } catch (error) {
        throw error;
    }
};

const updateOneItem = (itemId, changes) => {
    const updatedItem = Inventory.updateOneItem(itemId, changes);
    return updatedItem;
};

const deleteOneItem = (itemId) => {
    Inventory.deleteOneItem(itemId);
};

module.exports = {
    getAllItems,
    getOneItem,
    addItem,
    updateOneItem,
    deleteOneItem,
};