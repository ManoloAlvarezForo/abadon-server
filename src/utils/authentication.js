import { getUserByToken } from '../resolvers/authentication';

export const getUserAuthenticated = async token => {
  return token !== '' ? await getUserByToken(token) : null;
};
