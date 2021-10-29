import { NextApiRequest, NextApiResponse } from 'next';
import marketService, { MarketService } from './market.service';

import Controller from '../../libs/controller';

export default class MarketListController extends Controller {
  private marketService!: MarketService;

  constructor() {
    super();
    this.marketService = marketService;
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ marketList: this.marketService.getMarketList() });
  }
}
