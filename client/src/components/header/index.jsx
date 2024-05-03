import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'


const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
   
    return (
        <nav className=' mx-auto flex flex-row justify-between items-center w-full z-10 fixed top-0 left-0 h-12 px-4 border-b border-blue-500 bg-gradient-to-r from-indigo-950 to-neutral-950'>
            
            {
                userLoggedIn
                    ?
                    <>  
                    
                   
                <div className='flex gap-x-2'>
               
                <div className='text-lg hover:bg-orange-200 rounded-md p-2'>
                    <Link className='text-purple-600' to={'/home'}>
                        <svg class="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <polyline points="5 12 3 12 12 3 21 12 19 12" />  
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                     </Link>
                
                 </div>
                    <div className='text-lg hover:bg-purple-200 rounded-md p-2'>
                         <Link className='text-purple-600' to={'/Apod'}>Today</Link>
                    </div>
                    <div className='text-lg hover:bg-yellow-200 rounded-md p-2'>
                            <Link className='text-yellow-600' to={'/MarsPhotos'}>Mars</Link>
                    </div>
                    <div className='text-lg hover:bg-green-200 rounded-md p-2'>
                            <Link className='text-green-600' to={'/Imagery'}>Satellite</Link>
                    </div>
                    <div className='text-lg hover:bg-pink-200 rounded-md p-2'>
                            <Link className='text-pink-600' to={'/PostHome'}>Blogs</Link>
                    </div>
                </div>
              
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-lg text-red-600 hover:bg-red-200 rounded-md p-2'>
                                <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
                                <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                </svg>
                            </button>
                    </>
                    :
                    <>
                        
                    </>
            }
        </nav>
    )
}

export default Header
