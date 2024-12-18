import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import data from '../data.json';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

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
    // Kezeld a "Részletek" gomb kattintást
    console.log('Részletek:', orderId);
    // Itt megnyithatsz egy modalt vagy navigálhatsz egy másik oldalra a rendelés részleteivel
  };

  return (
    <div>
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