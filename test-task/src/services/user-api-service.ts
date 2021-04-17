interface IUserApi {
  _apiBase: string;

  getUsers: () => Promise<JsonWebKey>;
}

export default class UserApi implements IUserApi {
  _apiBase = "https://5ff1d38edb1158001748b5c2.mockapi.io/api/v1";

  getUsers = async () => {
    const res = await fetch(`${this._apiBase}/users`);

    if (!res.ok) {
      throw new Error(`Colud not fetch users from ${this._apiBase}`);
    }

    return await res.json();
  };
}
