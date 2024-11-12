import { useState, useEffect } from 'react';

const ApiTest = () => {
    const [textData, setTextData] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8000/api.php/test')
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          console.log(data);
          setTextData(data);
        });
    }, []);
    return (
      <div>
        {textData}
      </div>
    );
  };
  export default ApiTest;