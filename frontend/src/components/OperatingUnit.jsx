import React from 'react';
import './OperatingUnit.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearDetailData, InsertClick, setPrintAction, setSaveClick } from '../redux/features/authSlice';
function OperatingUnit() {
    const printAction = useSelector((state) => state.auth.printAction);
    
  const dispatch = useDispatch();

    const handleClick = (action) => {
      if (action === 'New'){
        dispatch(clearDetailData());   // Clear Redux state and UI
      }
      if (action === 'Insert') {
        dispatch(InsertClick());
      }
      if (action === 'Save') {
        dispatch(setSaveClick(true));

      }
      // if (action === 'Print') {
      //   dispatch(setPrintAction(true));
      // }
    };
    const triggerPrint = () => {
      dispatch(setPrintAction(true));
    };

  return (
    <div className="buttons-container" style={printAction ? {visibility: 'hidden'} : {}}>
      <button className="action-button" onClick={() => handleClick('New')}>New</button>
      <button className="action-button" onClick={() => handleClick('Insert')}>Insert</button>
      <button className="action-button" onClick={() => handleClick('Save')}>Save</button>
      <button className="action-button" onClick={triggerPrint}>Print</button>
    </div>
  )
}

export default OperatingUnit