import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts';

const LoginRoute = ({children }) => {
  const {userData} = useContext(AuthContext);

  if (Object.keys(userData).length === 0) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default LoginRoute;