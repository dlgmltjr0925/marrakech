import Encryption from '../../libs/encryption';

export type Status = 'WAIT' | 'READY' | 'PLAY';

export type Rule = 0 | 2 | 3 | 4;

export interface MarketListObject {
  id: number;
  title: string;
  hasPassword: boolean;
  status: Status;
  canSpectate: boolean;
  rule: Rule;
  dealerIds: number[];
  spectatorIds: number[];
}

export default class MarketDto {
  private _id?: number;
  private _title?: string;
  private _password?: string | null;
  private _hasPassword?: boolean;
  private _status?: Status;
  private _canSpectate: boolean = false;
  private _rule?: Rule;
  private _dealerIds: Set<number> = new Set<number>();
  private _spectatorIds: Set<number> = new Set<number>();
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
    return this._hasPassword || false;
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

  get dealerIds() {
    return this._dealerIds;
  }

  get spectatorIds() {
    return this._spectatorIds;
  }

  addDealerId(id: number) {
    this._dealerIds.add(id);
  }

  removeDealerId(id: number) {
    this._dealerIds.delete(id);
  }

  addSpectatorId(id: number) {
    this._spectatorIds.add(id);
  }

  removeSpectatorId(id: number) {
    this._spectatorIds.delete(id);
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
      setPassword: async function (password: string | null) {
        market.password = password
          ? await Encryption.createHashedPassword(password)
          : null;
        return this;
      },
      setHashedPassword: function (password?: string) {
        if (password) market.password = password;
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
      setCreatedAt: function (createdAt: Date) {
        market.createdAt = createdAt;
        return this;
      },
      build: function () {
        return market;
      },
    };
  };

  toMarketListObject(): MarketListObject {
    return {
      id: this.id,
      title: this.title,
      hasPassword: this.hasPassword,
      status: this.status,
      canSpectate: this.canSpectate,
      rule: this.rule,
      dealerIds: [...this._dealerIds],
      spectatorIds: [...this._spectatorIds],
    };
  }
}
