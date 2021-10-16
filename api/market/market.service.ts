import { Market as MarketEntity, Player as PlayerEntity } from '.prisma/client';

import MarketDao from './market.dao';
import MarketDto from './market.dto';

export default class MarketService {
  private static instance: MarketService;
  private marketDao: MarketDao;
  private markets: MarketDto[];
  private marketPassword: Record<string, string> = {};

  constructor() {
    this.marketDao = new MarketDao();
    this.markets = [];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MarketService();
    }

    return this.instance;
  }

  async create(market: MarketDto) {
    const newMarket = await this.marketDao.create(market);

    market.id = newMarket.id;
    if (market.password) {
      this.marketPassword[market.id] = market.password;
      market.password = '';
    }

    this.markets.unshift(market);

    return market;
  }
}
