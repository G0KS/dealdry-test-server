require("dotenv").config();
require("./DB/connection");

const express = require("express");
const cors = require("cors");
const server = express();
const router = require("./Routes/router");

server.use(cors());
server.use(express.json());
server.use(router);
server.use("/uploads", express.static("./Uploads"));

const PORT = 4200 || process.env.PORT;

server.listen(PORT, () => {
   console.log("Server running at port: ", PORT);
});

server.get("/", (req, res) => {
   res.send("Server is working");
});
