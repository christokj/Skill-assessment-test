import React, { useEffect, useState } from 'react';
import './Header.css';
import { axiosInstance } from '../config/axiosInstance';
import { setDetailData, setSaveClick } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
function Header() {
  
      const printAction = useSelector((state) => state.auth.printAction);
  const data = useSelector((state) => state.auth.detailData) || []// Access data from Redux state
  const [vrNo, setVrNo] = useState('');
  const dispatch = useDispatch();
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

    const saveClick = useSelector((state) => state.auth.saveClick);
  
  useEffect(() => {
    if (saveClick) {

      const existingData = data.length > 0 ? data[0] : {};
  
    // Dispatch the updated data to Redux
    dispatch(setDetailData([{ ...existingData, vr_no: vrNo }]));
      // Function to save data
      const saveData = async () => {
        const header_table = data
        const detail_table = data
        const item_master = data
        try {
          const response = await axiosInstance.post('user/all_data', { header_table, detail_table, item_master });
          if (response.status === 200) {
            console.log('Data saved successfully:', response.data);

          } else {
            console.error('Failed to save data:', response);
          }
          dispatch(setSaveClick(false));
        } catch (error) {
          console.error('Error while saving data:', error);
          dispatch(setSaveClick(false));

        }
      };

      saveData(); // Call the save function
      
    } 
            dispatch(setSaveClick(false));
    
  }, [saveClick])
  
  
 const formattedDate = new Date(data[0]?.vr_date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) 

  return (
    <div style={printAction ? {visibility: 'hidden'} : {}}>
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
    </div>
  );
}

export default Header;
