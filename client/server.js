// dependencies
const express = require("express");
const path = require("path");
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

// variables
const app = express();
const port = process.env.PORT || 3050;

// reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'src'));

// middlewarres
app.use(connectLiveReload());
// app.use(express.static('./'));
// app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use(express.static(path.join(__dirname, 'dist')));

console.log(path.join(__dirname, "dist", "index.html"));

// routing
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// server
app.listen(port, () => console.log("Server running on port " + port + "..."));
