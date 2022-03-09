const express = require("express");
const cors = require('cors');
const app = express();
const cluster = require("cluster");
const forks = require("os").cpus().length;
const fs = require('fs');
const port = 6001;

async function fork() {
    app.use(express.json());
    app.use(cors());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    // just to ping the server to check
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello From Server',
            pid: process.pid
        });
    });
    // indicates that the api is version 1
    app.use("/v1", require("./src/routes/v1/index"));

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${process.pid} listening at port: ` + port);
        }
    });
};

if (cluster.isMaster) {
    console.log("Server is starting up...");
    for (let i = 0; i < forks; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log({
            worker: worker.process.pid,
            code,
            signal
        });
    });
} else {
    fork();
}

process.on("uncaughtException", async (error) => {
    console.log("uncaughtException", error);
});