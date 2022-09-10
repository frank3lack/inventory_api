const express = require("express");
const bodyParser = require("body-parser");
const v1InventoryRouter = require("./v1/routes/inventoryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/inventory", v1InventoryRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
})