import React, { useState, useEffect, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import axios from 'axios';
import OrderDetailsModal from '../components/OrderDetailsModal';
import '../styles/admin.css';
import { data } from 'react-router-dom';
import { AdminBufeContext } from '../Contexts';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc
  const {adminBufe} = useContext(AdminBufeContext);

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
        params: { place_id: adminBufe.id }
      });
  
      // Ellenőrizzük, hogy `valasz.rendelesek` létezik és tömb-e
      const orders = response.data?.valasz?.rendelesek;
      if (Array.isArray(orders)) {
        setOrders(orders);
      } else {
        setOrders([]); // Ha nem tömb, akkor üres tömb
      }
    } catch (err) {
      setError(err.message);
      setOrders([]); // Hiba esetén is üres tömb
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [adminBufe.id]);

  const handleDetails = (orderId) => {
    setSelectedOrder(orders.filter(order => order.id == orderId));
    setIsDetailsModalOpen(true);
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
            onDetails={handleDetails}
          />
        ))}
      </div>
      <h2>Aktív rendelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="orders-grid">
        {
        orders.filter(order => order.status == 2 || order.status == 3 ).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onDetails={handleDetails}
          />
        ))}
      </div>
      <h2>Korábbi rendelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="orders-grid">
        {
        orders.filter(order => order.status == 4 || order.status == 5 ).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;