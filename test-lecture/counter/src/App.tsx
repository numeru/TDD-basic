import React, { useState } from 'react';

function App() {
  const [counterValue, setCounterValue] = useState(0);

  const handleClickPlusButton = () => {
    setCounterValue((prev) => prev + 1);
  };

  const handleClickMinusButton = () => {
    setCounterValue((prev) => prev - 1);
  };

  return (
    <div>
      <p data-testid="counter">{counterValue}</p>

      <button type="button" onClick={handleClickPlusButton}>
        +
      </button>
      <button
        type="button"
        data-testid="minus-button"
        onClick={handleClickMinusButton}
      >
        -
      </button>
    </div>
  );
}

export default App;
