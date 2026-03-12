import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import Listing from './Pages/Listing'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import PropertyDetails from './Pages/PropertyDetails'
import MyBookings from './Pages/MyBookings'
import Footer from './Components/Footer'
import AgencyReg from './Components/AgencyReg'
import { useAppContext } from './context/AppContext'
import AddProperty from './Pages/Owner/AddProperty'
import Sidebar from './Components/Owner/Sidebar'
import Dashboard from './Pages/Owner/Dashboard'
import ListProperty from './Pages/Owner/ListProperty'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const location = useLocation()
  const isOwnerPath = location.pathname.includes('owner')
  const { showAgencyReg } = useAppContext()

  return (
    <main>
      {!isOwnerPath && <Header />}
      {showAgencyReg && <AgencyReg />}
      <Toaster position='bottom-right' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<PropertyDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Sidebar />} >
          <Route index element={<Dashboard />} />
          <Route path="/owner/add-property" element={<AddProperty />} />
          <Route path="/owner/list-property" element={<ListProperty />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </main>
  )
}

export default App
