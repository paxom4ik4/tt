export const fetchUsers = async () => {
  const res = await fetch(
    "https://5ff1d38edb1158001748b5c2.mockapi.io/api/v1/users"
  );
  return res;
};
