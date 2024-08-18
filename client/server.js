// dependencies
const express = require("express");
const path = require("path");
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

// variables
const port = 3050;
const app = express();

// reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'src'));

// middlewarres
app.use(connectLiveReload());
app.use(express.static('./'));
// app.use("/src", express.static(path.resolve(__dirname, "src")));

// routing
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// server
app.listen(port, () => console.log("Server running on port " + port + "..."));
