const invalidChar = ["i", "o", "l"];

export function isValid(password: string) {
  if (password.split("").some((c) => invalidChar.includes(c))) {
    return false;
  }

  if (
    password
      .replace(/(\w)\1/g, "@")
      .split("")
      .filter((c) => c === "@").length < 2
  ) {
    return false;
  }

  for (let x = 2; x < password.length; x++) {
    if (
      password.charCodeAt(x) - 1 === password.charCodeAt(x - 1) &&
      password.charCodeAt(x) - 2 === password.charCodeAt(x - 2)
    ) {
      return true;
    }
  }

  return false;
}
