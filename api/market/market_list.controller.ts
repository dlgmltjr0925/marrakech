import { NextApiRequest, NextApiResponse } from 'next';

import Controller from '../../libs/controller';
import MarketService from './market.service';

export default class MarketListController extends Controller {
  private static instance: MarketListController;
  private marketService!: MarketService;

  constructor() {
    if (MarketListController.instance) return MarketListController.instance;

    super();
    this.marketService = new MarketService();

    MarketListController.instance = this;
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { page } = req.query;

    if (typeof page === 'string') {
      res.status(200).json({
        marketList: this.marketService.getListByPage(parseInt(page as string)),
      });
    } else {
      res.status(400).end('page is required');
    }
  }
}
