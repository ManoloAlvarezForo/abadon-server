import jwt from "jsonwebtoken";

//TODO: Refactor this implementation

export const APP_SECRET = "GraphQL-is-aw3some";

export const getUserId = (context) => {
  const authorization = context.request.get("Authorization");
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Usuario no autenticado");
  // throw new Error("Not authenticated");
};
