import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Home = () => {
    const { currentUser } = useAuth()
    return (
       
        <div className="background-container">
             {/* <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div> */}
        <div className="sketchfab-embed-wrapper">
        <iframe
      title="Stylized planet"
      frameBorder="0"
      allowFullScreen
      mozAllowFullScreen={true}
      webkitAllowFullScreen={true}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      src="https://sketchfab.com/models/789725db86f547fc9163b00f302c3e70/embed?ui_controls=0"
      execution-while-out-of-viewport
      execution-while-not-rendered
      web-share
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    ></iframe>
        </div>
        </div>
    )
}

export default Home