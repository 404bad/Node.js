import { nanoid } from "nanoid";

export const generateNanoid = (length = 8) => {
  return nanoid(length);
};
