// Password hashing with Node's built-in scrypt. Shared by the app and the CLI scripts.
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${hash.toString("base64url")}`;
}

export async function verifyPassword(password, stored) {
  const [algo, salt, hash] = String(stored).split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = await scrypt(password, salt, expected.length);
  return timingSafeEqual(expected, actual);
}

export const MIN_PASSWORD_LENGTH = 8;
