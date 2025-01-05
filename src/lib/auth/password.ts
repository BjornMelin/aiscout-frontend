import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";

const SALT_ROUNDS = 12;
const TOKEN_LENGTH = 32;
const TOKEN_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordError";
  }
}

export async function hashPassword(password: string): Promise<string> {
  try {
    if (!password) {
      throw new PasswordError("Password is required");
    }
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    if (error instanceof PasswordError) {
      throw error;
    }
    throw new PasswordError("Failed to hash password");
  }
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    if (!password || !hashedPassword) {
      throw new PasswordError("Password and hashed password are required");
    }
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    if (error instanceof PasswordError) {
      throw error;
    }
    throw new PasswordError("Failed to verify password");
  }
}

export function generateResetToken(): string {
  const nanoid = customAlphabet(TOKEN_ALPHABET, TOKEN_LENGTH);
  return nanoid();
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  if (/\s/.test(password)) {
    errors.push("Password must not contain spaces");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function isStrongPassword(password: string): boolean {
  const { isValid } = validatePassword(password);
  return isValid;
}
