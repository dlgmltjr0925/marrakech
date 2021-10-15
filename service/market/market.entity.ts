export default class Market {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _password: string | null;
  private readonly _createdAt: number;

  constructor(
    id: number,
    title: string,
    password: string | null,
    createdAt: number
  ) {
    this._id = id;
    this._title = title;
    this._password = password;
    this._createdAt = createdAt;
  }
}
