import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./UserContext";
import PulseLoader from "react-spinners/PulseLoader";

export const PasswordContext = createContext();
export const PasswordsListContext = () => {
  return useContext(PasswordContext);
};

export const PasswordProvider = ({ children }) => {
  const { user } = useAuth();
  const [passwordsList, setPasswordList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const idRegistration = user.registration_id;
  const url = `${process.env.REACT_APP_BASE_SERVER_URL}passwords/getPasswords/${idRegistration}`;

  const getPasswords = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPasswordList(data?.result);
      if (data.result) setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getPasswords();
  }, [user]);

  const value = {
    passwordsList,
    setPasswordList,
    error,
    setError,
    loading,
  };
  return (
    <PasswordContext.Provider value={value}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-gif">
            <PulseLoader
              color="#f9a01b"
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        children
      )}
    </PasswordContext.Provider>
  );
};
