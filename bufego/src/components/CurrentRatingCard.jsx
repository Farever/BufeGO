import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css"


//propsba dobjam majd be a place id-t
function MonthlyIncomeChart() {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

  const fetchRatings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost/13c-vegh/api/index.php/currentrating', {
        params: { place_id: "1"},
      });

      const formattedRatings = response.data.valasz.map(item => ({
        current_rating: Number(item.current_rating),       // Convert 'honap' to a number
      }));

      setRating(formattedRatings[0].current_rating);  // Update state with the formatted data
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(); // Az első lekérdezés a komponens mountolásakor

    const intervalId = setInterval(fetchRatings, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad

  return (
    <div className="col-sm-12 col-md-12">
      
      {/*<ApiTest returnData={setTextData}/>*/}
      <Card className=' rating text-center'>
        <Card.Body>
          <h1>Jelenlegi értékelés</h1>
          <Rating className='rating' name="read-only" value={Math.round(rating * 2) / 2} precision={0.5} readOnly />
      </Card.Body>
    </Card>
    </div>
  );
}

export default MonthlyIncomeChart;