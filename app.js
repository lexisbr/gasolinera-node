const express = require("express");
const logger = require("morgan");
const http = require("http");
const cors = require("cors"); // Import cors module
const app = express();
const PORT = 3000;

app.set("port", PORT);
app.use(logger("dev"));
app.use(cors()); // Use cors middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));


const server = http.createServer(app);
server.listen(PORT);

require("./routes")(app);

module.exports = app;
