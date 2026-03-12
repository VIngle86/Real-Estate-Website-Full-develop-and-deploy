import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyProperties } from '../assets/data'
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  //const [searchedCities, setSearchedCities] = useState([])
  const [showAgencyReg, setShowAgencyReg] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  // CLIENT
  const { user } = useUser();
  const { getToken } = useAuth()


  const getProperties = () => {
    setProperties(dummyProperties);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })
      if (data.success) {
        setIsOwner(data.role === "agencyOwner")
        setSearchedCities(data.recentSearchedCities)
      } else {
        //retry fetch user details after 5 seconds
        setTimeout(() => {
          getUser()
        }, 5000);
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])


  useEffect(() => {
    getProperties()
  }, [])

  const value = {
    navigate, properties, currency,
    user, showAgencyReg, setShowAgencyReg, isOwner, setIsOwner, axios, getToken
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
