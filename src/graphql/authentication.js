import * as AuthenticationResolver from '../resolvers/authentication';

export const Authentication = `
  type AuthPayLoad {
    token: String
    user: User
  }

  type ValidToken {
    isValid: Boolean
  }
`;

export const AuthenticationResolvers = {
  Query: {
    isValidToken(_, { token }, context) {
      // validateAuthentication(context.user);
      return AuthenticationResolver.isValidToken(token);
    },
  },
  Mutation: {
    signup(_, args) {
      return AuthenticationResolver.signup(args);
    },
    login(_, args) {
      return AuthenticationResolver.login(args);
    },
  },
};
