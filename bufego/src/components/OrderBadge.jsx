import "../styles/OrderBadge.css";

const OrderBadge = ({status}) => {
  const getBadgeClass = () => {
    switch (status) {
      case 0:
        return 'deleted-order';
      case 1:
        return 'new-order';
      case 2:
        return 'in-progress';
      case 3:
          return 'ready';
      case 4:
          return 'collected';
      case 5:
         return 'rated';
      default:
        return '';
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case 0:
        return 'Törölt rendelés';
      case 1:
        return 'Új rendelés';
      case 2:
        return 'Folyamatban';
      case 3:
        return 'Elkészült';
      case 4:
        return 'Átvett';
      case 5:
        return 'Értékelt'
      default:
        return 'Ismeretlen állapot';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {getBadgeText()}
    </span>
  );
};

export default OrderBadge;