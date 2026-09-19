import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ImageSection from '../Login/ImageSection'
import LoginForm from '../Login/LoginForm'
import HomePage from '../Pages/HomePage'
import Reels from '../Reels/Reels'
import Search from '../Search/Search'
import Messages from '../Messages/Messages'
import Storyviewer from '../Home/Storyviewer/Storyviewer'
import Profile from '../Profile/Profile'


const Routing = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<><ImageSection/><LoginForm /></>} />
      <Route path='/HomePage' element={<HomePage/>}/>
      <Route path='/Reels' element={<Reels/>}/>
      <Route path='/Search' element={<Search/>}/>
      <Route path='/Messages'element={<Messages/>}/>
      <Route path='/Storyviewer/:index' element={<Storyviewer />}/>
      <Route path='/Profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default Routing