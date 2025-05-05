/**
 * Encryption Utilities
 * Provides functions for securely hashing and verifying passwords
 *
 * IMPORTANT SECURITY NOTE:
 * In real-world applications, password hashing should be a one-way process.
 * Proper cryptographic hashing algorithms (like bcrypt, Argon2, or PBKDF2) are
 * designed to be irreversible - you should never be able to retrieve the original
 * password from a hash. This is a fundamental security principle.
 *
 * The "unhashPassword" function below is provided ONLY for educational purposes
 * and should NEVER be implemented in a production environment.
 */

/**
 * Creates a simple hash of a password using a basic algorithm
 * Note: In a production environment, you should use a more secure method like bcrypt
 * @param {string} password - The password to hash
 * @returns {string} - The hashed password
 */
export const hashPassword = (password) => {
  // Simple hashing function using a combination of techniques
  // This is a basic implementation and should be replaced with a proper library in production
  let hash = 0;
  if (password.length === 0) return hash.toString();

  // Create a hash based on char codes and positions
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Add some salt with the password length
  const salt = password.length * 7;
  hash = hash * salt;

  // Convert to string and add a prefix for identification
  return "hashed_" + Math.abs(hash).toString(16);
};

/**
 * Verifies a password against a stored hash
 * @param {string} password - The password to verify
 * @param {string} storedHash - The stored hash to compare against
 * @returns {boolean} - Whether the password matches the hash
 */
export const verifyPassword = (password, storedHash) => {
  // If the stored password isn't hashed yet (for backward compatibility)
  if (!storedHash.startsWith("hashed_")) {
    return password === storedHash;
  }

  // Hash the input password and compare with stored hash
  const hashedPassword = hashPassword(password);
  return hashedPassword === storedHash;
};

/**
 * EDUCATIONAL PURPOSES ONLY - NOT FOR PRODUCTION USE
 *
 * Attempts to recover a password from its hash. This is only possible because
 * we're using a simple, reversible algorithm in this example.
 *
 * WARNING: This function is provided solely for educational purposes.
 * In real security systems:
 * 1. Password hashing MUST be one-way (irreversible)
 * 2. Attempting to reverse password hashes is a security anti-pattern
 * 3. Password recovery should be done via reset mechanisms, not by recovering the original password
 *
 * @param {string} hashedPassword - The hashed password to attempt to reverse
 * @returns {string|null} - The original password if recoverable, or null if not possible
 */
export const unhashPassword = (hashedPassword) => {
  // Only works with our specific hashing implementation
  if (!hashedPassword.startsWith("hashed_")) {
    console.error(
      "This is not a hashed password or uses a different hashing algorithm"
    );
    return null;
  }

  try {
    // Extract the hash value (remove the 'hashed_' prefix)
    const hashHex = hashedPassword.substring(7);
    const hashValue = parseInt(hashHex, 16);

    // Since our hashing algorithm is very simple and deterministic,
    // we can try to brute-force it with common passwords
    const commonPasswords = [
      "password",
      "123456",
      "qwerty",
      "admin",
      "welcome",
      "password123",
      "abc123",
      "letmein",
      "123456789",
      "12345678",
      "admin123",
      "test123",
      "password1",
      "welcome1",
      "monkey",
    ];

    // Try each common password to see if it produces the given hash
    for (const password of commonPasswords) {
      if (hashPassword(password) === hashedPassword) {
        console.warn(
          "Password recovered through brute force. This demonstrates why simple hashing is insecure!"
        );
        return password;
      }
    }

    console.error(
      "Could not recover the password. This is actually good from a security perspective."
    );
    return null;
  } catch (error) {
    console.error("Error attempting to unhash password:", error);
    return null;
  }
};
