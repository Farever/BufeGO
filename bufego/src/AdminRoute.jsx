import { useContext, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AdminBufeContext, AuthContext } from './Contexts';

const AdminRoute = ({requireBuffet, children }) => {
  const {userData} = useContext(AuthContext);
  const {adminBufe} = useContext(AdminBufeContext)

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  if (userData.is_admin != 1) {
    return <Navigate to="/" replace />; //Vagy egy "Nincs jogosultságod" oldalra
  }

  if(requireBuffet && adminBufe == null){
      console.log(adminBufe);
      return <Navigate to="/admin" replace />;
  }

  // Ha minden rendben, rendereljük a gyerek elemeket
  return children;
};

export default AdminRoute;