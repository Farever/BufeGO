import { LineChart } from '@mui/x-charts';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css";

const monthNames = [
  'Jan', 'Febr', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

function MonthlyIncomeChart({bufeId}) {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [years, setYears] = useState([]);
  const selectedyear = useRef(0);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

  const fetchRatings = async () => {
    if(selectedyear.current.value != 0)
    {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/stat_monthly_income', {
          params: { place_id: bufeId, year:selectedyear.current.value},
        });

        const formattedRatings = response.data.valasz.map(item => ({
          honap: Number(item.honap),       // Convert 'honap' to a number
          average_income: Number(item.average_income)  // Convert 'average_income' to a number
        }));

        setRatings(formattedRatings);  // Update state with the formatted data
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
      const response = await axios.get('http://localhost:8000/eveklekerorders', {
        params: { place_id: bufeId},
      });
      console.log(response.data.valasz);
      setYears(response.data.valasz)

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(); // Az első lekérdezés a komponens mountolásakor
    fetchYears();

    const intervalId = setInterval(()=>{fetchRatings(); fetchYears()}, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad

  return (
    <div className="col-sm-12 col-md-6">
      
      {/*<ApiTest returnData={setTextData}/>*/}
      <Card className='chart'>
        <Card.Body>
          <h1>Havi bevétel</h1>
          <>Statisztika éve: 
            <select onChange={fetchRatings} ref={selectedyear}>
              <option value={0}>Válasszon ki egy évet</option>
              {years.map((i) => (
              <option key={i.ev} value={i.ev}>{i.ev}</option>
              ))}
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
            min: 0
          }]}
          series={[{ dataKey: 'average_income' }]}
          height={300}
          margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
          />
      </Card.Body>
    </Card>
    </div>
  );
}

export default MonthlyIncomeChart;