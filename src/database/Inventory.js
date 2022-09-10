const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllItems = () => {
    return DB.items;
};

const getOneItem = (itemId) => {
    const item = DB.items.find((item) => item.id === itemId);
    if(!item){
        return;
    }
    return item;
};

const addItem = (newItem) => {
    const isAlreadyAdded = 
        DB.items.findIndex((item) => item.name === newItem.name) > -1;
    if(isAlreadyAdded){
        //update amount? 
        //maybe not handle that here 
        //just report that item already exists 
        //then use this api in your kitchen manager app and handle the business logic of whether to add or udpate there
        //how to handle measurment differences/conversions?
        //there are 2 kinds of updates for amounts
        //1) updating the entire amt e.g. there is 1 cup of sugar to add regardless of what is currently in inventory
        //2) adjustments e.g. there is 1 cup of sugar in inventory and I want to add/subtract another cup
        //situation 1 could use the current update function situation 2 may need a separate adjustment function
        throw {
            status: 400,
            message: `Item with the name '${newItem.name}' already exists`,
        };
    }
    try{
        DB.items.push(newItem);
        saveToDatabase(DB);
        return newItem;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const updateOneItem = (itemId, changes) => {
    const indexForUpdate = DB.items.findIndex(
        (item) => item.id === itemId
    );
    if (indexForUpdate === -1){
        return;
    }
    const updatedItem = {
        ...DB.items[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC" }),
    };
    DB.items[indexForUpdate] = updatedItem;
    saveToDatabase(DB);
    return updatedItem;
}

const deleteOneItem = (itemId) => {
    const indexForDeletion = DB.items.findIndex(
        (item) => item.id === itemId
    );
    if (indexForDeletion === -1) {
        return;
    }
    DB.items.splice(indexForDeletion, 1);
    saveToDatabase(DB);
}

module.exports = { 
    getAllItems,
    getOneItem,
    addItem,
    updateOneItem,
    deleteOneItem,
};