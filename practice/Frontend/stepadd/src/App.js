import React, { useState } from "react";
import axios from "axios";
import './index.css';

const App = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [steps, setSteps] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/steps", {
        num1,
        num2,
      });
      setSteps(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="navbar">
      <h3 className="heading" >Step Addition</h3>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="num1">First Number:</label>
          <input
            type="text"
            id="num1"
            value={num1}
            onChange={(event) => setNum1(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="num2">Second Number:</label>
          <input
            type="text"
            id="num2"
            value={num2}
            onChange={(event) => setNum2(event.target.value)}
          />
        </div>
        <button type="submit">Generate Steps</button>
      </form>
      <div>
        {steps.map((step, index) => (
          <div key={index}>
            <p>
              Carry: {step.carryString}
            </p>
            <p>
              Sum: {step.sumString}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;