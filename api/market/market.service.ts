export default class MarketService {
  private static instance: MarketService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MarketService();
    }

    return this.instance;
  }
}
