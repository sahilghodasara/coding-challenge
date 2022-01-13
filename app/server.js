"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs_1 = require("fs");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const todos = express();
todos.get('/', (_, res) => {
    const data = JSON.parse((0, fs_1.readFileSync)(path.join(process.cwd(), 'data.json'), 'utf8'));
    res.json(data);
});
todos.post('/', (req, res) => {
    const data = JSON.parse((0, fs_1.readFileSync)(path.join(process.cwd(), 'data.json'), 'utf8'));
    req.body.id = data.length;
    data.push(req.body);
    (0, fs_1.writeFileSync)(path.join(process.cwd() + '/data.json'), JSON.stringify(data));
    return res.json(data);
});
todos.put('/:index', (req, res) => {
    const data = JSON.parse((0, fs_1.readFileSync)(path.join(process.cwd(), 'data.json'), 'utf8'));
    let mappedArray = data.map(function (e) {
        return { ...e };
    });
    let taskFounded = mappedArray.find((ele) => ele.id == req.params.index);
    taskFounded.is_checked = req.body.is_checked;
    (0, fs_1.writeFileSync)(path.join(process.cwd() + '/data.json'), JSON.stringify(mappedArray));
});
todos.delete('/:index', (req, res) => {
    const data = JSON.parse((0, fs_1.readFileSync)(path.join(process.cwd(), 'data.json'), 'utf8'));
    data.splice(req.params.index, 1);
    (0, fs_1.writeFileSync)(path.join(process.cwd() + '/data.json'), JSON.stringify(data));
    return res.json(data);
});
app.use('/api/todos', todos);
const httpServer = http.createServer(app);
const host = '0.0.0.0';
const port = 8888;
httpServer.listen({ host, port }, () => console.log(`Listening on ${host}:${port}`));
