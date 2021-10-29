import { NextApiRequest, NextApiResponse } from 'next';
import marketService, { MarketService } from './market.service';

import Controller from '../../libs/controller';
import Encryption from '../../libs/encryption';
import MarketDto from './market.dto';

export default class MarketController extends Controller {
  private static instance: MarketController;
  private marketService!: MarketService;

  constructor() {
    if (MarketController.instance) return MarketController.instance;
    super();
    this.marketService = marketService;

    MarketController.instance = this;
  }

  async post(req: NextApiRequest, res: NextApiResponse) {
    const { title, password = null, rule, canSpectate } = req.body;

    const market = MarketDto.Builder()
      .setTitle(title)
      .setRule(rule)
      .setCanSpectate(canSpectate)
      .build();

    if (password) {
      market.password = await Encryption.createHashedPassword(password);
    }

    const newMarket = await this.marketService.create(market);

    res.status(201).json({ market: newMarket });
  }
}
