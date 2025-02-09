import { LineChart } from '@mui/x-charts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css"


const monthNames = [
  'Jan', 'Febr', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const year = 1994;


function MonthlyRatingChart() {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

  const fetchRatings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost/13c-vegh/api/index.php/getmonthlyrating', {
        params: { place_id: "1", year:year},
      });

      const formattedRatings = response.data.valasz.map(item => ({
        honap: Number(item.honap),       // Convert 'honap' to a number
        atlagrating: Number(item.atlagrating)  // Convert 'atlagrating' to a number
      }));

      setRatings(formattedRatings);  // Update state with the formatted data
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
    <div className="col-sm-12 col-md-6">
      
      {/*<ApiTest returnData={setTextData}/>*/}
      <Card className='chart'>
        <Card.Body>
          <h1>Havi értékelések</h1>
          <>Statisztika éve: {year}</>
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