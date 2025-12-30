import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 10;

export const auth = {
  // Hash password
  hashPassword: async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  // Verify password
  verifyPassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },

  // Generate JWT token
  generateToken: (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  },

  // Verify JWT token
  verifyToken: (token: string): any => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  // Login user
  login: async (email: string, password: string) => {
    try {
      const user = await db.user.findByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await auth.verifyPassword(password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      // Generate token
      const token: string = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      };
    } catch (error) {
      if (error instanceof Error && (error.message === "User not found" || error.message === "Invalid password")) {
        throw error; // Re-throw authentication errors
      }
      // Handle database connection issues
      console.warn('Database connection issue in login:', error instanceof Error ? error.message : String(error));
      throw new Error("Service temporarily unavailable");
    }
  },

  // Logout user
  logout: async () => {
    // Cookie deletion is handled in the API route
  },

  // Get current user from token
  getCurrentUser: async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;

      if (!token) {
        return null;
      }

      const decoded = auth.verifyToken(token);
      if (!decoded) {
        return null;
      }

      const user = await db.user.findByEmail(decoded.email);
      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      };
    } catch (error) {
      // Handle database connection issues during build time
      console.warn('Database connection issue in getCurrentUser:', error instanceof Error ? error.message : String(error));
      return null;
    }
  },

  // Middleware helper
  requireAuth: async () => {
    const user = await auth.getCurrentUser();
    if (!user) {
      throw new Error("Authentication required");
    }
    return user;
  },

  // Check if user is admin
  isAdmin: async () => {
    const user = await auth.getCurrentUser();
    return user?.role === "ADMIN";
  },

  // Check if user is author
  isAuthor: async () => {
    const user = await auth.getCurrentUser();
    return (
      user?.role === "AUTHOR" ||
      user?.role === "ADMIN" ||
      user?.role === "EDITOR"
    );
  },
};
