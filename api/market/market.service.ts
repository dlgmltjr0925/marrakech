import { Socket, io } from 'socket.io-client';

import MarketDao from './market.dao';
import MarketDto from './market.dto';
import fs from 'fs';

export default class MarketService {
  private static instance: MarketService;
  private socket!: Socket;
  private marketDao!: MarketDao;
  private markets!: MarketDto[];
  private interval!: NodeJS.Timer;

  constructor() {
    if (MarketService.instance) return MarketService.instance;
    this.marketDao = new MarketDao();
    this.socket = io(`ws://localhost:3000/market/list`);
    this.markets = [];

    this.loadMarkets();

    this.interval = setInterval(() => {
      this.removeInactiveMarkets();
    }, 2000);

    MarketService.instance = this;
  }

  async create(market: MarketDto) {
    const newMarket = await this.marketDao.create(market);

    market.id = newMarket.id;
    market.createdAt = newMarket.createdAt;

    this.markets.unshift(market);

    setTimeout(() => {
      this.broadcastMarketList();
    });

    return market;
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
    this.socket.emit('updateMarketList', this.getMarketList());
  }

  removeInactiveMarkets() {
    const now = new Date().valueOf();

    const markets = this.markets.filter((market) => {
      const createdAt = new Date(market.createdAt).valueOf();
      return now - createdAt <= 10_000 || market.dealerIds.length > 0;
    });

    if (markets.length !== this.markets.length) {
      this.markets = markets;
      this.broadcastMarketList();
    }
  }
}
