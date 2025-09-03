import crypto from "crypto";

export function hashPasswordSHA256(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}