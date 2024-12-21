import React from 'react';
import './OperatingUnit.css'; 
function OperatingUnit() {

    const handleClick = (action) => {
      alert(`You clicked ${action}`);
    };

  return (
    <div className="buttons-container">
      <button className="action-button" onClick={() => handleClick('New')}>New</button>
      <button className="action-button" onClick={() => handleClick('Insert')}>Insert</button>
      <button className="action-button" onClick={() => handleClick('Save')}>Save</button>
      <button className="action-button" onClick={() => handleClick('Print')}>Print</button>
    </div>
  )
}

export default OperatingUnit