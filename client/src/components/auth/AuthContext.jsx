import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data or null if not logged in
  const [loading, setLoading] = useState(true); // To handle initial token check

  // On component mount, check for a stored token/user data
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Or get your token
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          console.error("Token has expired");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decodedUser.user);
        }
      } catch (e) {
        console.error("Failed to parse token from localStorage", e);
        localStorage.removeItem("token"); // Clear corrupted data
        setUser(null);
      }
    }
    setLoading(false); // Finished checking
  }, []);

  const login = (userData) => {
    const decodedUser = jwtDecode(userData.token);
    setUser(decodedUser.user);
    localStorage.setItem("token", userData.token); // Store only the token string
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear stored data
  };
  const userRole = () => {
    if (user) {
      return user.role;
    }
    return null;
  };

  // Simple check for authentication status
  const isAuthenticated = !!user;

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
