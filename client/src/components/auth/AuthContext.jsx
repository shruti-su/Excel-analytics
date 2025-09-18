import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "@/services/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data or null if not logged in
  const [loading, setLoading] = useState(true); // To handle initial token check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On component mount, check for a stored token/user data
  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            console.warn("Token has expired. Logging out.");
            logout();
          } else {
            // Token is valid, fetch full user profile
            const fullUser = await AuthService.getMe();
            setUser(fullUser);
            setIsAuthenticated(true);
          }
        } catch (e) {
          console.error("Failed to process token. Logging out.", e);
          logout();
        }
      }
      setLoading(false);
    };

    validateTokenAndFetchUser();
  }, []);

  const login = async (userData) => {
    localStorage.setItem("token", userData.token); // Store only the token string
    try {
      // After login, fetch the full user data to populate the context
      const fullUser = await AuthService.getMe();
      setUser(fullUser);
      setIsAuthenticated(true);
      return fullUser;
    } catch (error) {
      console.error("Failed to fetch user after login, logging out.", error);
      logout(); // If getMe fails, the token is likely bad, so log out.
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear stored data
  };
  const userRole = () => {
    if (user) {
      return user.role;
    }
    return null;
  };

  // Provide loading state if needed for initial rendering before auth check completes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
