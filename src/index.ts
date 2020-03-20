import * as express from 'express';
import * as ws from 'ws';
import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;
const server = http.createServer(app);

app.get('/:channel', (req, res) => {
  const wss = new ws.Server({ server, path: `/${req.params.channel}` });

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('Received: ' + message);
      wss.clients.forEach(client => {
        client.send(message);
      });
    });

    ws.on('close', () => {
      console.log('I lost a client');
    });
  });
});

server.listen(
  port, () => console.log(`Hello app listening on port ${port}!`)
);