import { Socket, io } from 'socket.io-client';

import MarketDao from './market.dao';
import MarketDto from './market.dto';
import fs from 'fs';

export default class MarketService {
  private static instance: MarketService;
  private socket!: Socket;
  private marketDao!: MarketDao;
  private markets!: MarketDto[];

  constructor() {
    if (MarketService.instance) return MarketService.instance;
    this.marketDao = new MarketDao();
    this.socket = io(`ws://localhost:3000/market/list`);
    this.markets = [];

    this.loadMarkets();

    MarketService.instance = this;
  }

  async create(market: MarketDto) {
    const newMarket = await this.marketDao.create(market);

    market.id = newMarket.id;

    this.markets.unshift(market);
    this.saveMarkets();

    setTimeout(() => {
      this.broadcastAddMarket();
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
        ({ _id, _title, _password, _canSpectate, _rule }: any) => {
          return MarketDto.Builder()
            .setId(_id)
            .setTitle(_title)
            .setHashedPassword(_password)
            .setCanSpectate(_canSpectate)
            .setRule(_rule)
            .build();
        }
      );
      this.broadcastAddMarket();
    }
  }

  getMarketList() {
    return this.markets.map((market) => market.toMarketListObject());
  }

  broadcastAddMarket() {
    this.socket.emit('updateMarketList', this.getMarketList());
  }
}
