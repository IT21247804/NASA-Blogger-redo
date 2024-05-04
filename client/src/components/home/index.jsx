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
        setTypewriterStrings([dynamicText])
    }, [currentUser, dynamicText])

    return (
        <div  className='flex justify-center items-center h-screen mx-auto '
        
        >
            <div className='text-center text-lg sm:text-4xl font-bold text-white p-4'>
            <Typewriter
        options={{
            strings: [
                `${dynamicText}`,
                ` Welcome to the <span class="text-red-500">NASA</span> <span class="text-blue-500">Blogger</span>`,
                ` View Astronomic Pic of the Day - <span class="text-purple-500">Apod</span>`,
                ` View Satelite views - <span class="text-green-500">Earth</span>`,
                ` View Mars rover photos - <span class="text-yellow-500">Mars</span>`,
                ` View Blogs and Create - <span class="text-pink-500">Blogs</span>`,
            ], // Combine dynamic and static text with HTML tags for styling
            autoStart: true,
            loop: true,
            delay: 50, // Adjust the delay between each character
            html: true,
            // Enable HTML tags in strings
            
             
        }}
        
    />
         
            </div>
        </div>
    )
}

export default Home
