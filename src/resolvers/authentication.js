import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/utils";
import { getUserByEmail, getUserById, addUser } from "../resolvers/user";

/**
 * Creates the token according the user param.
 *
 * @param {object} user User Object.
 */
const createToken = ({ id }) => {
  return jwt.sign({ userId: id }, APP_SECRET);
};

/**
 * Validates the user to return a token with the user.
 *
 * @param {Object} args Arguments that contains the user object.
 */
export const login = async (args) => {
  const user = await getUserByEmail(args.email);

  if (!user) {
    console.log(`[ERROR]: Usuario no encontrado.`);
    // console.log(`[ERROR] User not found`);

    throw new Error("El usuario no existe.");
    // throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    console.log(`[ERROR]: Password no valido.`);
    // console.log(`[INFO] invalid password...`);

    throw new Error("[ERROR]: Password no valido.");
    // throw new Error("Invalid password");
  }
  console.log(`[INFO]: Acceso correcto.`);
  // console.log(`[INFO] user logged sussesfully...`);

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
export const isValidToken = (token) => {
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
export const getUserByToken = async (token) => {
  let userResponse = null;
  try {
    const response = jwt.verify(token, APP_SECRET);
    userResponse = await getUserById(response.userId);
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
export const signup = async (args) => {
  //Validates if he email of the new user exist and throw an error.
  const userFound = await getUserByEmail(args.email);
  if (userFound) {
    throw new Error("El usuario ya existe.");
    // throw new Error("This user already exists...");
  }

  //Encrypt the password.
  const cryptPassword = await bcrypt.hash(args.password, 10);

  //Create the new user.
  const user = await addUser({
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
