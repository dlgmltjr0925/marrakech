import { ConnectUser, DisconnectUser } from '../../libs/market_namespace';
import { Socket, io } from 'socket.io-client';

import MarketDao from './market.dao';
import MarketDto from './market.dto';
import fs from 'fs';

export class MarketService {
  private marketListNamespace!: Socket;
  private marketNamespace!: Socket;
  private marketDao!: MarketDao;
  private markets!: MarketDto[];
  private interval!: NodeJS.Timer;

  constructor() {
    console.info('MarketService#constructor');

    this.marketDao = new MarketDao();
    this.marketListNamespace = io(`ws://localhost:3000/market/list`);
    this.marketNamespace = io(`ws://localhost:3000/market/0`);
    this.markets = [];

    this.loadMarkets();

    // if (process.env.NODE_ENV === 'production')
    this.interval = setInterval(() => {
      this.removeInactiveMarkets();
    }, 5000);

    this.setMarketNamespaceEventHandler();
  }

  async create(market: MarketDto) {
    const newMarket = await this.marketDao.create(market);

    market.id = newMarket.id;
    market.createdAt = newMarket.createdAt;

    this.markets.unshift(market);

    setTimeout(() => {
      this.broadcastMarketList();
    });

    return market.toMarketListObject();
  }

  saveMarkets() {
    fs.writeFile(
      './markets.data',
      JSON.stringify(this.markets),
      'utf-8',
      (err) => {
        if (err) throw err;
      }
    );
  }

  loadMarkets() {
    if (fs.existsSync('./markets.data')) {
      const data = fs.readFileSync('./markets.data');
      const markets = JSON.parse(data.toString('utf-8'));
      this.markets = markets.map(
        ({ _id, _title, _password, _canSpectate, _rule, _createdAt }: any) => {
          return MarketDto.Builder()
            .setId(_id)
            .setTitle(_title)
            .setHashedPassword(_password)
            .setCanSpectate(_canSpectate)
            .setRule(_rule)
            .setCreatedAt(_createdAt)
            .build();
        }
      );
    }
  }

  getMarketList() {
    return this.markets.map((market) => market.toMarketListObject());
  }

  broadcastMarketList() {
    this.saveMarkets();
    this.marketListNamespace.emit('updateMarketList', this.getMarketList());
  }

  removeInactiveMarkets() {
    const now = new Date().valueOf();

    const markets = this.markets.filter((market) => {
      const createdAt = new Date(market.createdAt).valueOf();
      return now - createdAt <= 10_000 || market.dealerIds.size > 0;
    });

    if (markets.length !== this.markets.length) {
      this.markets = markets;
      this.broadcastMarketList();
    }
  }

  setMarketNamespaceEventHandler() {
    this.marketNamespace.on(
      'connectUser',
      ({ socketId, userId, roomId }: ConnectUser) => {
        const market = this.markets.find((market) => market.id === roomId);
        if (!market) return;
        market.dealerIds.add(userId);

        this.broadcastMarketList();
      }
    );

    this.marketNamespace.on(
      'disconnectUser',
      ({ socketId, userId, roomId }: DisconnectUser) => {
        const market = this.markets.find((market) => market.id === roomId);
        if (!market) return;
        market.dealerIds.delete(userId);

        if (market.dealerIds.size === 0) {
          this.markets = this.markets.filter((market) => market.id !== roomId);
        }

        this.broadcastMarketList();
      }
    );
  }
}

export default new MarketService();
