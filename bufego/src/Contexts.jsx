import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AdminBufeContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminBufe, setAdminBufe] = useState(() => {
        const storedBufe = sessionStorage.getItem('adminBufe');
        return storedBufe ? JSON.parse(storedBufe) : null;
      });

  const setBufe = (bufe) => {
    setAdminBufe(bufe);
    sessionStorage.setItem('adminBufe', JSON.stringify(bufe));
  };

  return (
    <AdminBufeContext.Provider value={{ adminBufe, setBufe }}>
      {children}
    </AdminBufeContext.Provider>
  );
};

export const AuthProvider = ({children}) => {
  const [userData, setUserData]  = useState(() => {
    const storedUser = sessionStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const setUser = (user) => {
    setUserData(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}