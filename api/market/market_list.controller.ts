import Controller from '../../libs/controller';
import MarketService from './market.service';

export default class MarketListController extends Controller {
  private marketService: MarketService;

  constructor() {
    super();
    this.marketService = MarketService.getInstance();
  }
}
