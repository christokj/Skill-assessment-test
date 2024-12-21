import React from 'react'
import ItemDetails from '../../components/ItemDetails'
import OperatingUnit from '../../components/OperatingUnit'
import './HomePage.css'
function HomePage() {
  return (
    <div className='container'>
      <ItemDetails/>
      <OperatingUnit/>
    </div>
  )
}

export default HomePage;