import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : {};
    } catch (error) {
      console.error(error);
      localStorage.removeItem("user");
      return {};
    }
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token;
  });
  const [isLoading, setIsLoading] = useState(true);

  const url = `${process.env.REACT_APP_BASE_SERVER_URL}users/profile`;
  const method = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getUser = async () => {
    try {
      const response = await fetch(url, method);
      const data = await response.json();
      if (data.user != null) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);
  const logout = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const value = {
    user: user,
    setUser: setUser,
    logout: logout,
    error: error,
    setError: setError,
    isLoading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
