import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/utils';
import * as UserResolver from '../resolvers/user';

/**
 * Creates the token according the user param.
 *
 * @param {object} user User Object.
 */
const createToken = user => {
  return jwt.sign({ userId: user.id }, APP_SECRET);
};

/**
 * Validates the user to return a token with the user.
 *
 * @param {Object} args Arguments that contains the user object.
 */
export const login = async args => {
  const user = await UserResolver.getUserByEmail(args.email);

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error('Invalid password');
  }

  return {
    token: createToken(user),
    user,
  };
};

/**
 * Validates token.
 *
 * @param {String} token JWT Token to be validated.
 */
export const isValidToken = token => {
  let isValid = { isValid: false };

  try {
    const response = jwt.verify(token, APP_SECRET);
    response && (isValid.isValid = true);
  } catch (error) {
    console.log(error);
    isValid.isValid = false;
  }

  return isValid;
};

/**
 * Gets the user authenticated by a token.
 *
 * @param {String} token JWT Token.
 */
export const getUserByToken = async token => {
  let userResponse = null;
  try {
    const response = jwt.verify(token, APP_SECRET);
    userResponse = await UserResolver.getUserById(response.userId);
  } catch (error) {
    console.log(error);
  }

  return userResponse;
};

/**
 * Creates a new user with the cryptopassword to return a token.
 *
 * @param {Object} args Arguments that contains the user object.
 */
export const signup = async args => {
  //Validates if he email of the new user exist and throw an error.
  const userFound = await UserResolver.getUserByEmail(args.email);
  if (userFound) {
    throw new Error('This user already exists...');
  }

  //Encrypt the password.
  const cryptPassword = await bcrypt.hash(args.password, 10);

  //Create the new user.
  const user = await UserResolver.addUser({
    name: args.name,
    email: args.email,
    password: cryptPassword,
  });

  //Create the user token.
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};
