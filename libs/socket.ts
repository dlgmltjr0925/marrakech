import { Server } from 'socket.io';
import http from 'http';

export default class Socket {
  private io: Server;

  private static instance: Socket | null = null;

  constructor(server: http.Server) {
    this.io = new Server(server);

    this.io.on('connection', (socket) => {
      console.info(`\x1b[32m[socket] connected - ${socket.id}\x1b[0m`);

      socket.on('disconnect', () => {
        console.info(`\x1b[31m[socket] disconnected - ${socket.id}\x1b[0m`);
      });
    });
  }

  static getInstance(server?: http.Server) {
    if (!this.instance && server) {
      this.instance = new Socket(server);
    }

    return this.instance as Socket;
  }

  broadcast(event: string, ...args: any) {
    this.io.emit(event, ...args);
  }
}
