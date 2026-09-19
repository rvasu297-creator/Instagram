import React from 'react'
import { useLocation } from 'react-router-dom'
import Routing from './Components/Routing/Routing'
import ImageSection from './Components/Login/ImageSection'
import LoginForm from './Components/Login/LoginForm'
import Footer from './Components/Footer/Footer'

const App = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isReelsPage = path === '/reels';
  const isMessagesPage = path === '/messages';

  return (
    <>
    <div className='loginpage'>
    <Routing/>
    </div>
    <div className={`${isReelsPage ? 'footer-hidden-mobile' : ''} ${isMessagesPage ? 'footer-hidden-mobile' : ''}`}>
      <Footer/>
    </div>
    </>
  )
}

export default App