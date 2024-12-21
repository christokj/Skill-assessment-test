import React from 'react'
import './Header.css';

function Header() {
  return (
  <>
    <section className="header-container">
      <div className="header-item">Vr NO:- <input type="text" id="firstName" name="vrNo"/> <button>Search by Vr No</button> </div>
      <div className="header-item">Vr Date:- <input type="text" id="firstName" name="vrDate"/></div>
      <div className="header-item">Status:- <input type="text" id="firstName" name="status"/></div>
    </section>
    <section className="header-container">
      <div className="header-item">Ac Name:- <input type="text" id="firstName" name="acName"/></div>
      <div className="header-item">Ac Amt:- <input type="text" id="firstName" name="acAmt"/></div>
    </section>
  </>
  )
}

export default Header