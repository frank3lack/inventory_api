const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.get("/", inventoryController.getAllItems);

router.get("/:itemId", inventoryController.getOneItem);

router.post("/", inventoryController.addItem);

router.patch("/:itemId", inventoryController.updateOneItem);

router.delete("/:itemId", inventoryController.deleteOneItem);

module.exports = router;
