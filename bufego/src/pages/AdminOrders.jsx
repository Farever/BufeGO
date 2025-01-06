import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import data from '../data.json';
import OrderDetailsModal from '../components/OrderDetailsModal';
import '../styles/admin.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Simulált API hívás a lokális JSON adatbázisból
      const response = { data: data.orders };
      setOrders(response.data);
    } catch (error) {
      setError('Hiba történt az adatok betöltése közben.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Az első lekérdezés a komponens mountolásakor

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
      <h2>Rendelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="orders-grid">
        {orders.map((order) => (
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