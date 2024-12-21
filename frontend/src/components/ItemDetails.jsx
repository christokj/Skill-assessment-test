import React, { useEffect } from 'react'
import './ItemDetails.css';
import { axiosInstance } from '../config/axiosInstance';
import { setData } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

function ItemDetails() {
  const data = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from the database
    axiosInstance
      .get('/api/items')
      .then((response) => {
        dispatch(setData(response.data))
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
   <div className="table-container">
      <table className="details-table">
        <thead>
          <tr>
            <th>Sr NO</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ItemDetails