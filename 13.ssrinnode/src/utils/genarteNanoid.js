import { nanoid } from "nanoid";

export const generateShortId = (length = 8) => {
  return nanoid(length);
};
