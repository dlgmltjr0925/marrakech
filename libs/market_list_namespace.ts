import MarketDto from '../api/market/market.dto';
import { Server } from 'socket.io';
import SocketNamespace from './socket_namespace';

export interface UpdateMarketListMessage {
  room: string;
  list: MarketDto[];
}

export default class MarketListNamespace extends SocketNamespace {
  constructor(io: Server) {
    super(io, /^\/market\/list\/\d*$/);

    this.addEventListener('connect', (socket) => {
      const room = socket.nsp.name.replace('/market/list/', 'marketList');
      console.info(`[socket][${room}] joined - ${socket.id}`);
      socket.join(room);
    });

    this.addEventListener('connect', (socket) => {
      socket.on('updateMarketList', (messages: UpdateMarketListMessage[]) => {
        for (const { room, list } of messages) {
          this.ns.to(room).emit('marketList', list);
        }
      });
    });
  }

  emitMarketList(room: string, marketList: string[]) {
    console.log('emit', room, marketList);
    this.ns.to(room).emit('marketList', marketList);
  }
}
