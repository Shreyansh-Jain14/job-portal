import * as jwt  from "jsonwebtoken";

export const parseToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch {
    return null;
  }
};