import React from 'react'
import Aside from '../components/Aside'
import { useNavigate } from 'react-router-dom'


function Home() {

  const navigate = useNavigate()
  const profileId = localStorage.getItem('instagramId')

  if (!profileId) {
    navigate('/auth/login')
  }

  return (
    <div>
        <div>
          <Aside />
        </div>
    </div>
  )
}

export default Home