import React, { useState } from 'react'
import Sidebar from '../Home/Sidebar/Sidebar'
import MainSection from '../Home/MainSection/MainSection'
import Message from '../Home/Message/Message'
import Suggestion from '../Home/Suggestion/Suggestion'
import Notification from '../Notifications/Notifications'


const HomePage = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div>
      <Sidebar
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
      <Message />
      <div className='side'>
        <MainSection
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        <Suggestion />
      </div>
      {showNotifications && (
        <Notification onClose={() => setShowNotifications(false)} />
      )}
    </div>
  )
}

export default HomePage
