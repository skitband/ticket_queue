import React, {useState, createContext } from 'react'
import Customer from './Customer'
import Admin from '../Admin'
import { Route, Routes } from 'react-router-dom'

function Main() {

  const [currentTicket, setcurrentTicket] = useState<any>();

  return (
    <div className='content'>
        <Routes>
          <Route path='/' element={<Customer />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
    </div>
    
  )
}

export default Main