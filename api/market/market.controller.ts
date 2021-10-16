import { NextApiRequest, NextApiResponse } from 'next';

import Controller from '../../libs/controller';
import Encryption from '../../libs/encryption';
import MarketDto from './market.dto';
import MarketService from './market.service';

export default class MarketController extends Controller {
  private marketService: MarketService;

  constructor() {
    super();
    this.marketService = MarketService.getInstance();
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
