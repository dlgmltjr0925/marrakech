import PlayerDao from './player.dao';
import PlayerDto from './player.dto';

export class PlayerService {
  private static instance: PlayerService | null = null;
  private playerDao: PlayerDao;
  private latestId: number;

  constructor() {
    console.log('PlayerService#constructor');
    this.playerDao = new PlayerDao();
    this.latestId = 0;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PlayerService();
    }

    return this.instance;
  }

  async create() {
    if (!this.latestId) {
      const latestPlayer = await this.playerDao.findLatestPlayer();
      this.latestId = latestPlayer?.id ?? 0;
    }

    const name = '어썸' + `${++this.latestId}`.padStart(4, '0');

    return await this.playerDao.create(name);
  }

  async findById(id: number) {
    return await this.playerDao.findById(id);
  }

  async update(id: number, name: string) {
    const player = new PlayerDto(id, name);
    return await this.playerDao.update(player);
  }
}
