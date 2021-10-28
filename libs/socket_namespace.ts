import { Namespace, Server, Socket } from 'socket.io';

type EventCallback = (socket: Socket) => void;
type EventListenerKey = 'connect' | 'disconnect';

export default class SocketNamespace {
  protected io: Server;
  protected ns: Namespace;

  private eventListeners: Record<EventListenerKey, EventCallback[]> = {
    connect: [],
    disconnect: [],
  };

  constructor(io: Server, nsp: string | RegExp) {
    this.io = io;
    this.ns = io.of(nsp);

    this.ns.on('connect', (socket) => {
      console.info(
        `\x1b[32m[socket][${socket.nsp.name}] connected - ${socket.id}\x1b[0m`
      );

      for (const callback of this.eventListeners.connect) {
        callback(socket);
      }

      socket.on('disconnect', () => {
        console.info(
          `\x1b[31m[socket][${socket.nsp.name}] disconnected - ${socket.id}\x1b[0m`
        );

        for (const callback of this.eventListeners.disconnect) {
          callback(socket);
        }
      });
    });
  }

  addEventListener(ev: EventListenerKey, callback: EventCallback) {
    this.eventListeners[ev].push(callback);
  }
}
