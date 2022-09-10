const inventoryService = require("../services/inventoryService");

const getAllItems = (req, res) => {
    try{
        const allItems = inventoryService.getAllItems();
        res.send({ stauts: "OK", data: allItems });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneItem = (req, res) => {
    const {
        params: { itemId },
    } = req;
    if(!itemId){
        res
           .status(400)
           .send({
                status: "FAILED",
                data: { error: "Parameter ':itemId' can not be empty" },
            });
    }
    try{
        const item = inventoryService.getOneItem(itemId);
        res.send({ status: "OK", data:item });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    } 
};

const addItem = (req, res) => {
    const { body } = req;
    //how to use schema to handle this
    if(
        !body.name ||
        !body.amount ||
        !body.measurement
    ) {
        res
           .status(400)
           .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in the request  body: 'name', 'amount', 'measurement'",
                },
           });
        return;
    }

    const newItem = {
        name: body.name,
        amount: body.amount,
        measurement: body.measurement,
        purchaseDate: body.purchaseDate,
    };

    try{
        const createdItem = inventoryService.addItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    } catch (error) {
        res
           .status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
};

const updateOneItem = (req, res) => {
    const {
        body,
        params: { itemId },
    } = req;
    if(!itemId){
        return;
    }
    const updatedItem = inventoryService.updateOneItem(itemId, body);
    res.send({ status: "OK", data: updatedItem });
};

const deleteOneItem = (req, res) => {
    const {
        params: { itemId },
    } = req;
    if(!itemId){
        return;
    }
    inventoryService.deleteOneItem(itemId);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllItems,
    getOneItem,
    addItem,
    updateOneItem,
    deleteOneItem,
};