import { increment } from "./increment";
import { isValid } from "./is-valid";

export function nextPassword(password: string): string {
  do {
    password = increment(password);
  } while (!isValid(password));
  return password;
}
