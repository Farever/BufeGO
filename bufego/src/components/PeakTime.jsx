import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css"


function PeakTime({ bufeId }) {
  const [peaktime, setPeakTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const refreshInterval = 5000;

  const fetchPeaktime = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('./api/index.php/peak_time', {
        params: { place_id: bufeId },
      });

      setPeakTime(response.data.valasz[0])
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeaktime();

    const intervalId = setInterval(fetchPeaktime, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return (
    <div className="col-sm-12 col-md-12">
      <Card className='rating text-center w-50'>
        <Card.Title>
          Legforgalmasabb időszak
        </Card.Title>
        <Card.Body>
          <Card.Text>
            {error && (
              <div className="text-danger">Hiba: {error}</div>
            )}
            {peaktime.ora == undefined && (
              <div>Nincs adat</div>
            )}
            {!error && peaktime.ora != undefined && (
              `${peaktime.ora} óra`
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PeakTime;