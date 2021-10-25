import Socket from './libs/socket';
import http from 'http';
import next from 'next';
import { parse } from 'url';
import express from 'express';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.all('*', async (req, res) => {
    const parsedUrl = parse(req.url || '', true);

    await handler(req, res, parsedUrl);
  });

  const server = http.createServer(app);

  new Socket(server);

  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
});
