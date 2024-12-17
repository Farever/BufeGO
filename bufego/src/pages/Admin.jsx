import React, { useState } from 'react';
import OrdersModal from '../components/OrdersModal';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';

const Admin = () => {
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  
  // Teszt adatok - ezek jöhetnének API hívásból
  const handleOpenOrdersModal = () => {
    setIsOrdersModalOpen(true);
  };

  const handleCloseOrdersModal = () => {
    setIsOrdersModalOpen(false);
  };

  return (
    <div>
      <h1>Admin Felület</h1>
      <button onClick={handleOpenOrdersModal}>Beérkező rendelések</button>
      <Get url="http://localhost/api/index2.php/bufe_rendelesek" params={{place_id: "1"}}>
        {(error, response, isLoading, makeRequest, axios) => {
          if(response !== null) {
            return (<><OrdersModal
                isOpen={isOrdersModalOpen}
                onClose={handleCloseOrdersModal}
                orders={response.data.valasz}
              /></>)
          }
        }}
      </Get>
      
    </div>
  );
};

export default Admin;