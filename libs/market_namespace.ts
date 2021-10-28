import { Server } from 'socket.io';
import SocketNamespace from './socket_namespace';

export interface ConnectUser {
  socketId: string;
  userId: number;
  roomId: number;
}

export interface DisconnectUser extends ConnectUser {}

export default class MarketNamespace extends SocketNamespace {
  constructor(io: Server) {
    super(io, /^\/market\/\d+$/);

    this.addEventListener('connect', (socket) => {
      const token = socket.handshake.auth.token;
      const userId = this.getUserIdByToken(token);

      if (!userId) return;

      const room = socket.nsp.name.replace('/market/', 'market');
      socket.join(room);
      console.info(`[socket][${room}] joined - ${socket.id}`);

      const connectUser: ConnectUser = {
        socketId: socket.id,
        userId,
        roomId: parseInt(room.replace('market', '')),
      };

      this.ns.emit('connectUser', connectUser);
    });

    this.addEventListener('connect', (socket) => {
      socket.on('updatePlayGame', (msg: string) => {
        console.log(msg);
      });
    });

    this.addEventListener('disconnect', (socket) => {
      const token = socket.handshake.auth.token;
      const userId = this.getUserIdByToken(token);

      if (!userId) return;

      const room = socket.nsp.name.replace('/market/', 'market');

      const disconnectUser: ConnectUser = {
        socketId: socket.id,
        userId,
        roomId: parseInt(room.replace('market', '')),
      };

      this.ns.emit('disconnectUser', disconnectUser);
    });
  }

  getUserIdByToken(token: string | null) {
    if (!token) return null;
    token = Buffer.from(token.replace('Basic ', ''), 'base64')
      .toString('utf8')
      .split(':')[0];

    return parseInt(token);
  }
}
