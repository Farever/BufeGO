import React, { createContext, useEffect, useState } from 'react';

export const AdminBufeContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminBufe, setAdminBufe] = useState(() => {
        const storedBufe = sessionStorage.getItem('adminBufe');
        return storedBufe ? JSON.parse(storedBufe) : {};
      });

  const setBufe = (bufe) => {
    console.log("Setting bufe in context:", bufe);
    setAdminBufe(bufe);
    sessionStorage.setItem('adminBufe', JSON.stringify(bufe));
  };

  return (
    <AdminBufeContext.Provider value={{ adminBufe, setBufe }}>
      {children}
    </AdminBufeContext.Provider>
  );
};