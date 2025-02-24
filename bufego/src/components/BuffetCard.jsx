import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Importáljuk a csillag ikont

// Hook deklarációk a komponensen kívül helytelen! A komponensen belül kell lenniük!
// const [rating, setRating] = useState(0);
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);
const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

const BuffetCard = ({ buffet, isOnAdminPage = false }) => {
  // Hook deklarációk a komponensen belül
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/currentrating', {
          params: { place_id: buffet.id },
        });

        if (response.data && response.data.valasz && response.data.valasz.length > 0) {
          const formattedRatings = response.data.valasz.map(item => ({
            current_rating: Number(item.current_rating),
          }));
          setRating(formattedRatings[0].current_rating);
        } else {
          console.warn("No rating data received from the API");
          //Kezelheted itt a helyzetet, amikor nincs adat
          setRating(0); //pl. alapértelmezett érték beállítása
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching ratings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings(); // Az első lekérdezés a komponens mountolásakor

    const intervalId = setInterval(fetchRatings, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, []); // refreshInterval eltávolítva, mert nem változik

  const handleClick = () => {
    console.log(isOnAdminPage);
    if (isOnAdminPage) {
      console.log("Admin" + buffet.id);
    } else {
      console.log("User" + buffet.id);
    }
  };

  // Értékelés megjelenítése (csillagokkal)
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < Math.floor(rating) ? '#FFC107' : '#ddd'} // Arany vagy szürke szín
          style={{ marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="buffet-card">
      <Card.Img variant="top" src={buffet.image} />
      <Card.Body>
        <Card.Title>
          {buffet.name} - {buffet.school}
        </Card.Title>
        <Card.Text>{buffet.description}</Card.Text>
        <Card.Text>
          {buffet.zip_code}, {buffet.city}, {buffet.address}
        </Card.Text>
        <Card.Text>{buffet.phone}</Card.Text>

        {/* Értékelés megjelenítése */}
        <Card.Text>
          Értékelés: {renderStars()} ({rating}/5)
        </Card.Text>
        {isLoading && <p>Loading ratings...</p>}
        {error && <p>Error: {error}</p>}

        <Button variant="primary" onClick={handleClick} className="button">
          Megtekintés
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BuffetCard;