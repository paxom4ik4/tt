interface IUserApi {
  _apiBase: string;

  getUsers: () => Promise<JsonWebKey>;
  serachUsers: (searchTitle: string) => Promise<JsonWebKey>;
}

const resResolver = async (res: Response) => {
  if (!res.ok) {
    throw new Error("Colud not fetch users");
  }

  return await res.json();
};

export default class UserApi implements IUserApi {
  _apiBase = "https://5ff1d38edb1158001748b5c2.mockapi.io/api/v1";

  getUsers = async () => {
    const res = await fetch(`${this._apiBase}/users`);
    return resResolver(res);
  };

  serachUsers = async (searchTitle: string) => {
    const res = await fetch(`${this._apiBase}/users/?search=${searchTitle}`);
    return resResolver(res);
  };
}
