import React, { useState, useEffect } from 'react';
import OrdersModal from '../components/OrdersModal';
import axios from 'axios';

const Admin = () => {
    const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc


    const handleOpenOrdersModal = () => {
        setIsOrdersModalOpen(true);
      };
    
    const handleCloseOrdersModal = () => {
        setIsOrdersModalOpen(false);
      };


    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://localhost/13c-nagyl/api/index2.php/bufe_rendelesek', {
                params: { place_id: "1" },
            });
            setOrders(response.data.valasz);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(); // Az első lekérdezés a komponens mountolásakor

       /*const intervalId  = setInterval(fetchOrders, refreshInterval); // Lekérdezés a beállított időközönként

        return () => clearInterval(intervalId);*/ // Az intervallum törlése a komponens unmountolásakor
    }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad


    return (
        <div>
            <h1>Admin Felület</h1>
            <button onClick={handleOpenOrdersModal}>Beérkező rendelések</button>

            {isLoading && <p>Loading orders...</p>}
            {error && <p>Error fetching orders: {error}</p>}

            {orders && (
                  <OrdersModal
                      isOpen={isOrdersModalOpen}
                      onClose={handleCloseOrdersModal}
                      orders={orders}
                  />
               )}
        </div>
    );
};

export default Admin;