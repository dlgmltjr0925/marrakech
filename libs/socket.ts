import MarketListNamespace from './market_list_namespace';
import MarketNamespace from './market_namespace';
import { Server } from 'socket.io';
import http from 'http';

export default class Socket {
  private static instance: Socket;

  private io!: Server;
  private _marketListNamespace!: MarketListNamespace;
  private _marketNamespace!: MarketNamespace;

  constructor(server: http.Server) {
    if (Socket.instance) return Socket.instance;

    this.io = new Server(server);

    this.io.on('connection', (socket) => {
      console.info(`\x1b[32m[socket][/] connected - ${socket.id}\x1b[0m`);

      socket.on('disconnect', () => {
        console.info(`\x1b[31m[socket][/] disconnected - ${socket.id}\x1b[0m`);
      });
    });

    this._marketListNamespace = new MarketListNamespace(this.io);
    this._marketNamespace = new MarketNamespace(this.io);

    Socket.instance = this;
  }

  get marketListNamespace() {
    return this._marketListNamespace;
  }

  get marketNamespace() {
    return this._marketNamespace;
  }
}
