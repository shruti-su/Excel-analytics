import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data or null if not logged in
  const [loading, setLoading] = useState(true); // To handle initial token check

  // On component mount, check for a stored token/user data
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Or get your token
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        // You might want to validate the token with your backend here
        // For simplicity, we'll just set the user
        setUser(parsedToken);
      } catch (e) {
        console.error("Failed to parse token from localStorage", e);
        localStorage.removeItem('token'); // Clear corrupted data
      }
    }
    setLoading(false); // Finished checking
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', JSON.stringify(userData)); // Store user data/token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear stored data
  };

  // Simple check for authentication status
  const isAuthenticated = !!user;

  // Provide loading state if needed for initial rendering before auth check completes
  if (loading) {
    // You could return a loading spinner here
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};