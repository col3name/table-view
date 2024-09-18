import { customAlphabet } from "nanoid";

export const randomID = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz~!@#$%^&*()-_+={}][|,./?;:'\"<>",
  12,
);
