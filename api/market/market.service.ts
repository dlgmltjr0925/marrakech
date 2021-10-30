import {
  ConnectUser,
  DisconnectUser,
  MarketMessage,
} from '../../libs/market_namespace';
import { Socket, io } from 'socket.io-client';

import MarketDao from './market.dao';
import MarketDto from './market.dto';
import fs from 'fs';

enum MarketStatus {
  PLAY,
  READY,
  WAIT,
}

interface PlayerMap extends Record<string, Set<string>> {}
export class MarketService {
  private marketListNamespace!: Socket;
  private marketNamespace!: Socket;
  private marketDao!: MarketDao;
  private markets!: MarketDto[];
  private interval!: NodeJS.Timer;
  private playerMap: PlayerMap = {};

  constructor() {
    console.info('MarketService#constructor');

    this.marketDao = new MarketDao();
    this.marketListNamespace = io(`ws://localhost:3000/market/list`);
    this.marketNamespace = io(`ws://localhost:3000/market/0`);
    this.markets = [];

    this.loadMarkets();

    // if (process.env.NODE_ENV === 'production')
    this.interval = setInterval(() => {
      this.removeInactiveMarkets();
    }, 5000);

    this.setMarketNamespaceEventHandler();
  }

  async create(market: MarketDto) {
    const newMarket = await this.marketDao.create(market);

    market.id = newMarket.id;
    market.createdAt = newMarket.createdAt;

    this.markets.unshift(market);

    setTimeout(() => {
      this.broadcastMarketList();
    });

    return market.toMarketListObject();
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
    try {
      if (fs.existsSync('./markets.data')) {
        const data = fs.readFileSync('./markets.data');
        const markets = JSON.parse(data.toString('utf-8'));
        this.markets = markets.map(
          ({
            _id,
            _title,
            _password,
            _canSpectate,
            _rule,
            _createdAt,
          }: any) => {
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
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') this.saveMarkets();
      console.error(error);
    }
  }

  getMarketList() {
    return this.markets.map((market) => market.toMarketListObject());
  }

  broadcastMarketList() {
    this.saveMarkets();
    this.marketListNamespace.emit('updateMarketList', this.getMarketList());
  }

  broadcastMarket(marketMessage: MarketMessage) {
    this.marketNamespace.emit('updateMarket', marketMessage);
  }

  removeInactiveMarkets() {
    const now = new Date().valueOf();

    const markets = this.markets.filter((market) => {
      const createdAt = new Date(market.createdAt).valueOf();
      return now - createdAt <= 10_000 || market.dealerIds.size > 0;
    });

    if (markets.length !== this.markets.length) {
      this.markets = markets;
      this.broadcastMarketList();
    }
  }

  setMarketNamespaceEventHandler() {
    // Join user to market
    this.marketNamespace.on(
      'connectUser',
      ({ socketId, userId, roomId }: ConnectUser) => {
        const market = this.markets.find((market) => market.id === roomId);

        if (!market) return;

        if (market.dealerIds.has(userId)) {
          return this.playerMap[userId].add(socketId);
        } else if (market.canSpectate && market.spectatorIds.has(userId)) {
          return this.playerMap[userId].add(socketId);
        }

        const maxDealerSize = market.rule === 0 ? 4 : market.rule;

        if (market.status !== 'PLAY' && market.dealerIds.size < maxDealerSize) {
          // Join dealer
          market.addDealerId(userId);
          if (!this.playerMap[userId])
            this.playerMap[userId] = new Set<string>();
          this.playerMap[userId].add(socketId);

          if (market.dealerIds.size === maxDealerSize) {
            market.status = 'READY';
            this.sortMarkets();
          }

          return this.broadcastMarket({
            roomId,
            status: 'JOIN_DEALER',
            market: market.toMarketListObject(),
          });
        } else if (market.canSpectate) {
          // Join spectator
          market.addSpectatorId(userId);
          if (!this.playerMap[userId])
            this.playerMap[userId] = new Set<string>();
          this.playerMap[userId].add(socketId);
          return this.broadcastMarket({
            roomId,
            status: 'JOIN_SPECTATOR',
            market: market.toMarketListObject(),
          });
        } else {
          // Reject spectator
          this.broadcastMarket({
            roomId,
            status: 'REJECT',
            socketId,
          });
        }
      }
    );

    // Leave user from market
    this.marketNamespace.on(
      'disconnectUser',
      ({ socketId, userId, roomId }: DisconnectUser) => {
        const market = this.markets.find((market) => market.id === roomId);

        if (!market) return;

        const maxDealerSize = market.rule === 0 ? 4 : market.rule;

        if (market.spectatorIds.has(userId)) {
          this.playerMap[userId].delete(socketId);

          if (this.playerMap[userId].size === 0) {
            market.spectatorIds.delete(userId);

            this.broadcastMarket({
              roomId,
              status: 'LEAVE_SPECTATOR',
              market: market.toMarketListObject(),
            });
          }
        }

        if (market.dealerIds.has(userId)) {
          this.playerMap[userId].delete(socketId);

          if (this.playerMap[userId].size === 0) {
            market.dealerIds.delete(userId);

            if (
              market.status !== 'PLAY' &&
              market.dealerIds.size !== maxDealerSize
            ) {
              market.status === 'WAIT';
              this.sortMarkets();
            }

            this.broadcastMarket({
              roomId,
              status: 'LEAVE_DEALER',
              market: market.toMarketListObject(),
            });
          }
        }
      }
    );
  }

  sortMarkets() {
    this.markets.sort((a, b) => {
      if (a.status === b.status) {
        return b.id - a.id;
      } else {
        return MarketStatus[b.status] - MarketStatus[a.status];
      }
    });
  }
}

export default new MarketService();
