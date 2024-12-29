import React from 'react'
import ItemDetails from '../../components/ItemDetails'
import OperatingUnit from '../../components/OperatingUnit'
import './HomePage.css'
import Header from '../../components/Header'
function HomePage() {
  
  return (
    <div> 
      <Header />
    <div className='container'>
      <ItemDetails />
      <OperatingUnit /> 
    </div>
    </div>
  )
}

export default HomePage;