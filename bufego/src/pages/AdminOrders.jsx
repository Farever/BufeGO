import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import axios from 'axios';
import OrderDetailsModal from '../components/OrderDetailsModal';
import '../styles/admin.css';
import { data } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

  var ms = 0;
    setInterval(function () {
      ms+=5;
    }, 5);

  const handleCloseDetailsModal = () => {
    fetchOrders();
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/bufe_rendelesek', {
        params: { place_id: "1" },
      });
      await setOrders(response.data.valasz.rendelesek);
      console.log(orders)
      if(response.status == 200){
        console.log(ms + "ms - kész")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    console.log(orders);

    const intervalId = setInterval(fetchOrders, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]);

  const handleAccept = (orderId) => {
    // Kezeld az "Elfogad" gomb kattintást
    console.log('Elfogadva:', orderId);
    // Itt frissítheted az adott rendelés állapotát az adatbázisban
  };

  const handleReject = (orderId) => {
    // Kezeld az "Elutasít" gomb kattintást
    console.log('Elutasítva:', orderId);
    // Itt frissítheted az adott rendelés állapotát az adatbázisban
  };

  const handleDetails = (orderId) => {
    console.log(orderId);
    setSelectedOrder(orders.filter(order => order.id == orderId));
    setIsDetailsModalOpen(true);
    // Itt megnyithatsz egy modalt vagy navigálhatsz egy másik oldalra a rendelés részleteivel
  };

  return (
    <div>
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        order={selectedOrder}
      />
      <h2>Beérkező rendelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="orders-grid">
        {
          orders.filter((order) => order.status == 1).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAccept={handleAccept}
            onReject={handleReject}
            onDetails={handleDetails}
          />
        ))}
      </div>
      <h2>Aktív rendelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="orders-grid">
        {
        orders.filter(order => order.status == 2).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAccept={handleAccept}
            onReject={handleReject}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;