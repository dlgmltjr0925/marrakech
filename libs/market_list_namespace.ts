import MarketDto, { MarketListObject } from '../api/market/market.dto';

import { Server } from 'socket.io';
import SocketNamespace from './socket_namespace';

export default class MarketListNamespace extends SocketNamespace {
  constructor(io: Server) {
    super(io, '/market/list');

    // this.addEventListener('connect', (socket) => {
    //   const room = socket.nsp.name.replace('/market/list/', 'marketList');
    //   console.info(`[socket][${room}] joined - ${socket.id}`);
    //   socket.join(room);
    // });

    this.addEventListener('connect', (socket) => {
      socket.on('updateMarketList', (marketListObjects: MarketListObject[]) => {
        this.ns.emit('marketList', marketListObjects);
      });
    });
  }

  // emitMarketList(room: string, marketList: string[]) {
  //   console.log('emit', room, marketList);
  //   this.ns.to(room).emit('marketList', marketList);
  // }
}
