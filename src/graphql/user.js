import * as UserResolver from '../resolvers/user';

export const User = `
type User {
    id: String
    name: String
    email: String
  }
`;

export const UserResolvers = {
  Query: {
    users() {
      // validateAuthentication(context.user);
      return UserResolver.getUsers();
    },
  },
};
