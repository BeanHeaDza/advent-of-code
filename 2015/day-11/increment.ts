export function increment(password: string): string {
  const parts = password.split("");
  password = "";

  let end: string;
  while ((end = parts.pop()) === "z") {
    password += "a";
  }

  end = String.fromCharCode(end.charCodeAt(0) + 1);

  return parts.join("") + end + password;
}
