import React, { useEffect, useState } from 'react';
import './ItemDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { setDetailData, UpdateClick } from '../redux/features/authSlice';

function ItemDetails() {
  const dispatch = useDispatch();

  // Accessing Redux states
  const data = useSelector((state) => state.auth.detailData) || [];
  const message = useSelector((state) => state.auth.message) || false;
  const printAction = useSelector((state) => state.auth.printAction);
  
  // Local state for new item
  const [newItem, setNewItem] = useState({
    item_code: '',
    item_name: '',
    qty: '',
    rate: '',
    sr_no: '',
    amount: ''
  });

  // Handle input changes for the new item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Effect to handle updates when `message` state changes
  useEffect(() => {
    if (message) {
      // Validate fields
      console.log(newItem)
      if (
        !newItem.item_code ||
        !newItem.item_name ||
        !newItem.qty ||
        !newItem.rate ||
        !newItem.sr_no ||
        !newItem.amount
      ) {
        console.log(newItem)
        alert('Please fill all the fields');
        dispatch(UpdateClick()); // Reset `message` state
        return;
      }

      // Add the new item to Redux state
      const updatedData = [
        ...data,
        { ...newItem, qty: Number(newItem.qty), rate: Number(newItem.rate) },
      ];
      dispatch(setDetailData(updatedData));

      // Clear input fields
      setNewItem({
        item_code: '',
        item_name: '',
        qty: '',
        rate: '',
        sr_no: '',
        amount: ''
      });

      // Reset message state
      dispatch(UpdateClick());
    }
  }, [message, data, newItem, dispatch]);

  return (
    <div className="table-container" style={printAction ? {visibility: 'hidden'} : {}}>
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
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.sr_no}</td> 
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))
          ) : (
            <>
            </>
          )}

          {/* New Item Input Row */}
          <tr>
            <td>
              <input
                type="text"
                name="sr_no"
                value={newItem.sr_no}
                onChange={handleInputChange}
                placeholder="Sr No"
              />
            </td>
            <td>
              <input
                type="text"
                name="item_code"
                value={newItem.item_code}
                onChange={handleInputChange}
                placeholder="Item Code"
              />
            </td>
            <td>
              <input
                type="text"
                name="item_name"
                value={newItem.item_name}
                onChange={handleInputChange}
                placeholder="Item Name"
              />
            </td>
            <td>
              <input
                type="number"
                name="qty"
                value={newItem.qty}
                onChange={handleInputChange}
                placeholder="Qty"
              />
            </td>
            <td>
              <input
                type="number"
                name="rate"
                value={newItem.rate}
                onChange={handleInputChange}
                placeholder="Rate"
              />
            </td>
            <td>
              <input
                type="number"
                name="amount"
                value={newItem.amount}
                onChange={handleInputChange}
                
              /> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ItemDetails;
