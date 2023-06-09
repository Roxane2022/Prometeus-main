import { createHash } from "crypto"

export const getUsernameHash = (username: string) => {
  const hash = createHash("sha256")
  hash.update(username)
  return hash.digest("hex")
}