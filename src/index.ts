import * as express from 'express';
import * as exporessWS from 'express-ws';
import * as ws from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
exporessWS(app);
const port = process.env.PORT || 443;

const clients: ws[] = [];

// @ts-ignore: ws injected via express-ws
(app as exporessWS.Application).ws('/:room', (client, req) => {
  clients.push(client);

  client.on('message', message => {
    console.log('Received: ' + message);
    clients.forEach(client => {
      client.send(message);
    });
  });

  client.on('close', () => {
    console.log('I lost a client');
  });
});

app.listen(port, () => console.log(`Hello app listening on port ${port}!`));