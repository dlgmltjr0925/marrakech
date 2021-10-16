import { NextApiRequest, NextApiResponse } from 'next';

import Controller from '../../libs/controller';
import { PlayerService } from './player.service';

export default class PlayerController extends Controller {
  private playerService: PlayerService;

  constructor() {
    super();
    this.playerService = PlayerService.getInstance();
  }

  async post(req: NextApiRequest, res: NextApiResponse) {
    const newPlayer = await this.playerService.createPlayer();

    res.status(201).json({ player: newPlayer });
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id) return res.status(400).end();

    const player = await this.playerService.findById(+id);

    if (player) res.status(200).json({ player });
    else res.status(204).end();
  }

  async put(req: NextApiRequest, res: NextApiResponse) {
    const { id, name } = req.body;

    const updatedPlayer = await this.playerService.update(id, name);

    res.status(200).json({ player: updatedPlayer });
  }
}
