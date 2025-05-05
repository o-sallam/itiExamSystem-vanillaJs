/**
 * User Service - Handles user registration and authentication operations
 * This service manages user data in localStorage with secure password handling
 */

import { hashPassword, verifyPassword } from "../utils/encryptionUtils.js";

/**
 * Registers a new user in the system
 * @param {string} fullname - The user's full name
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {boolean} - Whether the registration was successful
 */
export const registerUser = (fullname, email, password) => {
  try {
    // Initialize users array if it doesn't exist
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users"));

    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      console.error("User with this email already exists");
      return false;
    }

    // Hash the password before storing
    const hashedPassword = hashPassword(password);

    // Add new user with hashed password
    users.push({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save updated users array
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User registered successfully");
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

/**
 * Authenticates a user with email and password
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {object|null} - The user object if authentication is successful, null otherwise
 */
export const authenticateUser = (email, password) => {
  try {
    // Check if users exist in localStorage
    if (!localStorage.getItem("users")) {
      console.error("No users found");
      return null;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    // Find user with matching email
    const user = users.find((user) => user.email === email);

    // Verify password if user exists
    if (user && verifyPassword(password, user.password)) {
      console.log("User authenticated successfully");
      // Return user without password for security
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      console.error("Invalid email or password");
      return null;
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
