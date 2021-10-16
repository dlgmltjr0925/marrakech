import MarketDto from './market.dto';
import client from '../../libs/prisma_client';

export default class MarketDao {
  async create({ title, password }: MarketDto) {
    return await client.market.create({
      data: {
        title,
        password,
      },
    });
  }

  async findById(id: number) {
    return await client.market.findFirst({
      where: {
        id,
      },
    });
  }
}
