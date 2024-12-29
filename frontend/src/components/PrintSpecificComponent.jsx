import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrintAction } from '../redux/features/authSlice';
import './Header.css';

// Component to Render Printable Content
const PrintableComponent = React.forwardRef(({ data, vrNo, formattedDate }, ref) => (
  <div ref={ref}>
    {/* Header Section */}
    <section className="header-container">
      <div className="header-item">
        Vr NO: 
        <input 
          type="text" 
          value={data[0]?.vr_no} 
          name="vr_no" 
        />
      </div>
    </section> 

    <div className="header-container">
      <div className="header-item">
        Vr Date: 
        <input 
          type={data[0]?.vr_date ? 'text' : 'date'} 
          name="vr_date" 
          value={data[0]?.vr_date ? formattedDate : ''}  
        />
      </div>
      <div className="header-item">
        Status: 
        <input 
          type="text" 
          name="status" 
          value={data[0]?.status || ''} 
        />
      </div>
      <div className="header-item">
        Ac Name: 
        <input 
          type="text" 
          name="ac_name" 
          value={data[0]?.ac_name || ''} 
        />
      </div>
      <div className="header-item">
        Ac Amt: 
        <input 
          type="text" 
          name="ac_amt" 
          value={data[0]?.ac_amt || ''} 
        />
      </div>
    </div>

    {/* Table Section */}
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
          {/* Existing Data */}
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No data available</td>
            </tr>
          )}

      
        </tbody>
      </table>
    </div>
  </div>
));

function PrintSpecificComponent() {
  const dispatch = useDispatch();
  const printAction = useSelector((state) => state.auth.printAction);
    const data = useSelector((state) => state.auth.detailData) || []// Access data from Redux state
  
  // Reference for the content to be printed
  const componentRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      // Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '-1000px';
      iframe.style.left = '-1000px';

      document.body.appendChild(iframe);

      // Write the content to the iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write('<html><head><title>Print</title></head><body>');
      doc.write(componentRef.current.outerHTML);
      doc.write('</body></html>');
      doc.close();

      // Print the content and cleanup
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(iframe); // Remove iframe after printing
        dispatch(setPrintAction(false)); // Reset Redux state
      }, 1000);
    } else {
      console.error('Component reference is not available.');
    }
  };

  useEffect(() => {
    if (printAction) {
      handlePrint();
    }
  }, [printAction, dispatch]);

  const formattedDate = new Date(data[0]?.vr_date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) 

  return (
    <div>
      {/* Render the Printable Component */}
      <PrintableComponent ref={componentRef} data={data} formattedDate={formattedDate} />
    </div>
  );
}

export default PrintSpecificComponent;
