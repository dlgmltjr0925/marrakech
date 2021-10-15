export default class Player {
  private readonly _id: number;
  private readonly _name: string;
  private _createdAt: number;
  private _updatedAt: number;

  constructor(id: number, name: string, createdAt: number, updatedAt: number) {
    this._id = id;
    this._name = name;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
