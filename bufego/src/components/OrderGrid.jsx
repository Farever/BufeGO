import OrderCard from "./OrderCard";
const OrderGrid = ({ orders, status, onDetails }) => {
    console.log(status)
    const filtered = orders.filter(order => status.includes(order.status));
  
    if (filtered.length === 0) {
      return <p className="text-muted">Nincs megjeleníthető rendelés.</p>;
    }
  
    return (
      <div className="row g-3">
        {filtered.map(order => (
          <div className="col-md-6 col-lg-4" key={order.id}>
            <OrderCard order={order} onDetails={onDetails} />
          </div>
        ))}
      </div>
    );
  };

  export default OrderGrid;