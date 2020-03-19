import * as express from 'express';
import * as expressWS from 'express-ws';
import * as dotenv from 'dotenv';

dotenv.config();

const ews = expressWS(express());
const port = process.env.PORT || 3001;

ews.app.ws('/:room', (client, req) => {
  client.on('message', message => {
    console.log('Received: ' + message);
    ews.getWss().clients.forEach(client => {
      client.send(message);
    });
  });

  client.on('close', () => {
    console.log('I lost a client');
  });
});

ews.app.listen(port, () => console.log(`Hello app listening on port ${port}!`));