import Encryption from '../../libs/encryption';

export type Status = 'WAIT' | 'READY' | 'PLAY';

export type Rule = 0 | 2 | 3 | 4;

export default class MarketDto {
  private _id?: number;
  private _title?: string;
  private _password?: string | null;
  private _hasPassword?: boolean;
  private _status?: Status;
  private _canSpectate?: boolean;
  private _rule?: Rule;
  private _dealerIds: number[] = [];
  private _spectatorIds: number[] = [];
  private _createdAt?: Date;
  private _deletedAt?: Date | null;

  set id(id: number) {
    this._id = id;
  }

  get id() {
    return this._id || 0;
  }

  set title(title: string) {
    this._title = title;
  }

  get title() {
    return this._title || '';
  }

  set password(password: string | null) {
    this._password = password;
    this._hasPassword = password !== null;
  }

  get password() {
    return this._password || null;
  }

  get hasPassword() {
    return this._hasPassword;
  }

  set status(status: Status) {
    this._status = status;
  }

  get status() {
    return this._status || 'WAIT';
  }

  set canSpectate(canSpectate: boolean) {
    this._canSpectate = canSpectate;
  }

  get canSpectate() {
    return !!this._canSpectate;
  }

  set rule(rule: Rule) {
    this._rule = rule;
  }

  get rule() {
    return this._rule || 0;
  }

  addDealerId(id: number) {
    this._dealerIds.push(id);
  }

  removeDealerId(id: number) {
    this._dealerIds = this._dealerIds.filter((dealerId) => dealerId !== id);
  }

  addSpectatorId(id: number) {
    this._spectatorIds.push(id);
  }

  removeSpectatorId(id: number) {
    this._spectatorIds = this._spectatorIds.filter(
      (spectatorId) => spectatorId !== id
    );
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get createdAt() {
    return this._createdAt || new Date();
  }

  set deletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
  }

  get deletedAt() {
    return this._deletedAt || null;
  }

  static Builder = function () {
    const market = new MarketDto();
    return {
      setId: function (id: number) {
        market.id = id;
        return this;
      },
      setTitle: function (title: string) {
        market.title = title;
        return this;
      },
      setPassword: async function (password: string) {
        market.password = await Encryption.createHashedPassword(password);
        return this;
      },
      setStatus: function (status: Status) {
        market.status = status;
        return this;
      },
      setRule: function (rule: Rule) {
        market.rule = rule;
        return this;
      },
      setCanSpectate: function (canSpectate: boolean) {
        market.canSpectate = canSpectate;
        return this;
      },
      build: function () {
        return market;
      },
    };
  };
}
