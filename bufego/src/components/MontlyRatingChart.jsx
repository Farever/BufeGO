import { LineChart } from '@mui/x-charts';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css"


const monthNames = [
  'Jan', 'Febr', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];


function MonthlyRatingChart({ bufeId }) {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [years, setYears] = useState([]);
  const selectedyear = useRef(0);
  const refreshInterval = 5000;

  useEffect(() => {
    if (years?.length > 0 && selectedyear.current.value == 0) {
      selectedyear.current.value = years[0].ev;
      fetchRatings();
    }
  }, [years]);

  const fetchRatings = async () => {
    if(selectedyear.current.value != 0 && selectedyear.current.value != undefined)
    {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/getmonthlyrating', {
          params: { place_id: bufeId, year: selectedyear.current.value },
        });

        const formattedRatings = response.data.valasz.map(item => ({
          honap: Number(item.honap),
          atlagrating: Number(item.atlagrating)
        }));

        setRatings(formattedRatings);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchYears = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/eveklekerratings', {
        params: { place_id: bufeId },
      });
      setYears(response.data.valasz)

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
    fetchYears();

    const intervalId = setInterval(() => { fetchRatings(); fetchYears() }, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-sm-12 col-md-12 col-lg-6">
      <Card className='chart'>
        <Card.Body>
          {error && <div className="text-danger">Hiba: {error}</div>}
          <h1>Havi értékelések</h1>
          <>Statisztika éve:
            <select onChange={fetchRatings} ref={selectedyear}>
              <option value={0}>Válasszon ki egy évet</option>
              {Array.isArray(years) && years.length > 0 && (
                years.map((i) => (
                  <option key={i.ev} value={i.ev}>{i.ev}</option>
              )))}
            </select>
          </>
          <LineChart
            dataset={ratings}

            xAxis={[{
              dataKey: 'honap',
              min: 1,
              max: 12,
              valueCount: 12,
              tickMinStep: 1,
              valueFormatter: (value) => monthNames[Math.round(value) - 1]
            }]}
            yAxis={[{
              min: 0,
              max: 10
            }]}
            series={[{ dataKey: 'atlagrating' }]}
            height={300}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default MonthlyRatingChart;