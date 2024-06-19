// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {twiml} from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: false}))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const MessagingResponse = twiml.MessagingResponse;

app.post('/incoming', (req, res) => {
  const message = req.body;
  console.log(req)
  console.log(`Received message from ${message.Body}`);
  const twiml = new MessagingResponse();
  twiml.message(`You said: ${message.Body}`);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});