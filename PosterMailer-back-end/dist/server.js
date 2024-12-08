"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const PORT = process.env.PORT || 3333;
app_1.app.listen(PORT, () => {
    console.log(`Back-end is running on ${PORT}`);
});
