import PlayerDto from './player.dto';
import client from '../../libs/prisma_client';

export default class PlayerDao {
  async create(name: string) {
    return await client.player.create({
      data: {
        name,
      },
    });
  }

  async findById(id: number) {
    return await client.player.findFirst({
      where: {
        id,
      },
    });
  }

  async findLatestPlayer() {
    return await client.player.findFirst({
      orderBy: [{ id: 'desc' }],
    });
  }

  async update({ id, name }: PlayerDto) {
    const player = await client.player.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return player;
  }
}
