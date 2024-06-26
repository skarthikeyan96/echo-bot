"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = require("twilio");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const MessagingResponse = twilio_1.twiml.MessagingResponse;
app.post('/incoming', (req, res) => {
    const message = req.body;
    console.log(req);
    console.log(`Received message from ${message.Body}`);
    const twiml = new MessagingResponse();
    twiml.message(`You said: ${message.Body}`);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
