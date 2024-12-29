import React, { useState } from 'react';
import './Header.css';
import { axiosInstance } from '../config/axiosInstance';
import { setDetailData } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
function Header() {

  const data = useSelector((state) => state.auth.detailData) || []// Access data from Redux state
  const [vrNo, setVrNo] = useState('');
  const dispatch = useDispatch();
console.log(data )
  const handleVrNoChange = (event) => {
    
    setVrNo(event.target.value);
    // const updatedVrNo = event.target.value;

    // const existingData = data.length > 0 ? data[0] : {};
  
    // // Dispatch the updated data to Redux
    // dispatch(setDetailData([{ ...existingData, vr_no: updatedVrNo }]));
  }
  const handleVrDateChange = (event) => {
    const updatedDate = event.target.value;

    // Existing data from the Redux store
    const existingData = data.length > 0 ? data[0] : {};
  
    // Dispatch the updated data to Redux
    dispatch(setDetailData([{ ...existingData, vr_date: updatedDate }]));

  };
  const handleStatusChange = (event) => {
    const updatedStatus = event.target.value;

    // Existing data from the Redux store
    const existingData = data.length > 0 ? data[0] : {};
  
    // Dispatch the updated data to Redux
    dispatch(setDetailData([{ ...existingData, status: updatedStatus }]));
  }
  const handleAcNameChange = (event) => {
    const updatedAcName = event.target.value;

    const existingData = data.length > 0 ? data[0] : {};

    // Update the status in Redux state
    dispatch(setDetailData([{ ...existingData, ac_name: updatedAcName }]));

  }
  const handleAcAmtChange = (event) => {
    const updatedAcAmt = event.target.value;

    const existingData = data.length > 0 ? data[0] : {};

    // Update the status in Redux state
    dispatch(setDetailData([{ ...existingData, ac_amt: updatedAcAmt }]));
  }

  const searchValue = async () => {
    try {
      const response = await axiosInstance.get('user/header_table');
      const filteredData = response.data.data.filter((item) => item.vr_no === vrNo);
      dispatch(setDetailData(filteredData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
 const formattedDate = new Date(data[0]?.vr_date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) 

  return (
    <>
      <section className="header-container">
        <div className="header-item">
          Vr NO: 
          <input 
            type="text" 
            value={vrNo} 
            name="vr_no" 
            onChange={handleVrNoChange} 
          />
          <button onClick={searchValue}>Search by Vr No</button>
        </div>
      </section>

        <div className="header-container">
          <div className="header-item">
            Vr Date: 
            <input 
              type={data[0]?.vr_date ? 'text' : 'date'} 
              name="vr_date" 
              onChange={handleVrDateChange} 
              value={data[0] ? formattedDate : ''}  
               
            />
          </div>
          <div className="header-item">
            Status: 
            <input 
              type="text" 
              name="status" 
              onChange={handleStatusChange} 
              value={data[0]?.status || ''} 
              
            />
          </div>
          <div className="header-item">
            Ac Name: 
            <input 
              type="text" 
              name="ac_name" 
              onChange={handleAcNameChange} 
              value={data[0]?.ac_name || ''} 
              
            />
          </div>
          <div className="header-item">
            Ac Amt: 
            <input 
              type="text" 
              name="ac_amt" 
              onChange={handleAcAmtChange} 
              value={data[0]?.ac_amt || ''} 
              
            />
          </div>
        </div>
    </>
  );
}

export default Header;
