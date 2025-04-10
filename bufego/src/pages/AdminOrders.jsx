import React, { useState, useEffect, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import axios from 'axios';
import Section from '../components/Section';
import OrderGrid from '../components/OrderGrid';
import OrderDetailsModal from '../components/OrderDetailsModal';
import '../styles/admin.css';
import { AdminBufeContext } from '../Contexts';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc
  const { adminBufe } = useContext(AdminBufeContext);

  const handleCloseDetailsModal = () => {
    fetchOrders();
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchOrders = async () => {
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
    <div className="container py-4">
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        order={selectedOrder}
      />

      {isLoading && <Loading />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Beérkező */}
      <Section title="Beérkező rendelések">
        <OrderGrid orders={orders} status={"1"} onDetails={handleDetails} />
      </Section>

      {/* Aktív */}
      <Section title="Aktív rendelések">
        <OrderGrid orders={orders} status={"23"} onDetails={handleDetails} />
      </Section>

      {/* Lezárt */}
      <Section title="Korábbi rendelések">
        <OrderGrid orders={orders} status={"45"} onDetails={handleDetails} />
      </Section>
    </div>
  );
};

export default Orders;