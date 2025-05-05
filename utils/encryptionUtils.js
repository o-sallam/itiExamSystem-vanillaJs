/**
 * Encryption Utilities
 * Provides functions for securely hashing and verifying passwords
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
