interface IUserApi {
  _apiUrl: string;

  getUsers: () => Promise<JsonWebKey>;
}

export default class UserApi implements IUserApi {
  _apiUrl = "https://5ff1d38edb1158001748b5c2.mockapi.io/api/v1/users";

  getUsers = async () => {
    const res = await fetch(this._apiUrl);

    if (!res.ok) {
      throw new Error(`Colud not fetch users from ${this._apiUrl}`);
    }

    return await res.json();
  };
}
