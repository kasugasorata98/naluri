const express = require("express");
const cors = require('cors');
const app = express();
const radiusOfSun = 696340; // in km
const cluster = require("cluster");
const forks = require("os").cpus().length;
const { calcPI } = require('./utils/util');
const fs = require('fs');
const port = 4001;
const { WebSocketServer, WebSocket } = require('ws');
const filename = {
    decimals: 'decimals.txt',
    latestPi: 'latestPi.txt'
};

async function main() {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        ws.send('Connected to websocket');
    });

    let fsWait = false;
    while (true) {
        try {
            fs.watch(filename.latestPi, async (event, file) => {
                if (file) {
                    if (fsWait) return;
                    fsWait = setTimeout(() => {
                        fsWait = false;
                    }, 100);
                    if (event === 'change') {
                        const latestPiString = await new Promise((resolve, reject) => {
                            fs.readFile(filename.latestPi, function (err, buf) {
                                if (err) {
                                    if (err.code === 'ENOENT') {
                                        fs.writeFile(filename.latestPi, "3", (err) => {
                                            if (err) console.log(err);
                                        });
                                        return resolve("3");
                                    }
                                    else {
                                        reject(err);
                                    }
                                }
                                else {
                                    resolve(buf.toString());
                                }
                            });
                        });
                        wss.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(latestPiString, { binary: false });
                            }
                        });
                        console.log(latestPiString);
                    }
                }
            });
            break;
        }
        catch (err) {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.writeFile(filename.latestPi, "3", (err) => {
                        if (err) console.log(err);
                    });
                }
                else {
                    console.log(err);
                    break;
                }
            }
        }
    }


}

async function fork() {
    app.use(express.json());
    app.use(cors());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello From Server',
            pid: process.pid
        });
    });

    app.get('/getPi', async (req, res) => {
        try {
            const decimals = await new Promise((resolve, reject) => {
                fs.readFile(filename.decimals, function (err, buf) {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            fs.writeFile(filename.decimals, "0", (err) => {
                                if (err) console.log(err);
                            });
                            return resolve(0);
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        resolve(Number(buf.toString()));
                    }
                });
            });
            const latestPi = calcPI(decimals);
            await new Promise((resolve, reject) => {
                fs.writeFile(filename.decimals, String(decimals + 1), (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            await new Promise((resolve, reject) => {
                fs.writeFile(filename.latestPi, latestPi, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            return res.json({
                latestPi
            });
        }
        catch (err) {
            console.log(err);
            let message = '';
            if (err.message) {
                message = err.message;
            }
            else {
                message = 'Something went wrong';
            }
            return res.status(500).json({
                message
            });
        }
    });

    app.get('/getCircumferenceOfSun', async (req, res) => {
        try {
            const latestPiString = await new Promise((resolve, reject) => {
                fs.readFile(filename.latestPi, function (err, buf) {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            fs.writeFile(filename.latestPi, "3", (err) => {
                                if (err) console.log(err);
                            });
                            return resolve(3);
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        resolve(Number(buf.toString()));
                    }
                });
            });
            const circumference = 2 * Number(latestPiString) * radiusOfSun;
            return res.json({
                circumferenceOfTheSun: circumference,
            });
        }
        catch (err) {
            console.log(err);
            let message = '';
            if (err.message) {
                message = err.message;
            }
            else {
                message = 'Something went wrong';
            }
            return res.status(500).json({
                message
            });
        }
    });

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
    main();
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