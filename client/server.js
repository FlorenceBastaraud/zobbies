// dependencies
const express = require("express");
const path = require("path");
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

// variables
const port = process.env.PORT || 3050;
const app = express();

// reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'static'));

// middlewarres
app.use(connectLiveReload());
app.use("/src", express.static(path.resolve(__dirname, "static", "src")));


// routing
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

// server
app.listen(port, () => console.log("Server running on port " + port + "..."));