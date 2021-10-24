import Socket from './libs/socket';
import http from 'http';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);

    handler(req, res, parsedUrl);
  });

  new Socket(server);

  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
});
