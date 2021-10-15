import { NextApiRequest, NextApiResponse } from 'next';

export default class Controller {
  constructor() {
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.handler = this.handler.bind(this);
  }

  async post(req: NextApiRequest, res: NextApiResponse) {
    await res.status(404).end();
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    await res.status(404).end();
  }

  async put(req: NextApiRequest, res: NextApiResponse) {
    await res.status(404).end();
  }

  async patch(req: NextApiRequest, res: NextApiResponse) {
    await res.status(404).end();
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    await res.status(404).end();
  }

  async handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case 'POST':
        return await this.post(req, res);
      case 'GET':
        return await this.get(req, res);
      case 'PUT':
        return await this.put(req, res);
      case 'PATCH':
        return await this.patch(req, res);
      case 'DELETE':
        return await this.delete(req, res);
    }
  }
}
