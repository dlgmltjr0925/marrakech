import { NextApiRequest, NextApiResponse } from 'next';
import marketService, { MarketService } from './market.service';

import Controller from '../../libs/controller';

export default class MarketListController extends Controller {
  private static instance: MarketListController;
  private marketService!: MarketService;

  constructor() {
    if (MarketListController.instance) return MarketListController.instance;

    super();
    this.marketService = marketService;

    MarketListController.instance = this;
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ marketList: this.marketService.getMarketList });
  }
}
