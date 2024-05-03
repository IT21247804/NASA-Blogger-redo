import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/authContext'
import Typewriter from "typewriter-effect"

const Home = () => {
    const { currentUser } = useAuth()
    const [dynamicText, setDynamicText] = useState('')
    const [typewriterStrings, setTypewriterStrings] = useState([])

    useEffect(() => {
        if (currentUser.displayName) {
            setDynamicText(`Hello ${currentUser.displayName}`)
        } else {
            setDynamicText(`Hello ${currentUser.email}`)
        }
        setTypewriterStrings([dynamicText, 'Welcome to the NASA Blogger'])
    }, [currentUser, dynamicText])

    return (
        <div className='flex justify-center items-center h-screen mx-auto'>
            <div className='text-center text-lg sm:text-4xl font-bold text-white p-4'>
                <Typewriter
                    options={{
                        strings: typewriterStrings,
                        autoStart: true,
                        loop: true,
                        delay: 50, // Adjust the delay between each character
                    }}
                />
            </div>
        </div>
    )
}

export default Home
