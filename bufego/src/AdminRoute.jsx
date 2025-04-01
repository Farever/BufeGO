import { useContext, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AdminBufeContext, AuthContext } from './Contexts';

const AdminRoute = ({requireBuffet, children }) => {
  const {userData} = useContext(AuthContext);
  const {adminBufe} = useContext(AdminBufeContext)

  if (Object.keys(userData).length === 0) {
    alert("Az oldal eléréséhez jelentkezz be!");
    return <Navigate to="/" replace />;
  }

  if (userData.is_admin != 1) {
    alert("Nincs jogusultságod ehhez az oldalhoz!");
    return <Navigate to="/home" replace />; //Vagy egy "Nincs jogosultságod" oldalra
  }

  if(requireBuffet && adminBufe == null){
      alert("Ehhez az oldalhoz büfét kell választanod!")
      return <Navigate to="/admin" replace />;
  }

  // Ha minden rendben, rendereljük a gyerek elemeket
  return children;
};

export default AdminRoute;