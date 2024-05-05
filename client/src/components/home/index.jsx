import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Typewriter from "typewriter-effect";
import mainpic from '../images/mainpic.jpg';

const Home = () => {
    const { currentUser } = useAuth();
    const [dynamicText, setDynamicText] = useState('');

    useEffect(() => {
        if (currentUser.displayName) {
            setDynamicText(`Hello ${currentUser.displayName}`);
        } else {
            setDynamicText(`Hello ${currentUser.email}`);
        }
    }, [currentUser]);

    const handleGetStartedClick = () => {
        // Scroll to the section with the specified ID when "Get Started" button is clicked
        document.getElementById("project-details").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='py-8 sm:py-12 h-screen mx-auto relative'>
            <div className='text-center text-lg sm:text-4xl font-bold text-white p-4'>
                <Typewriter
                    options={{
                        strings: [
                            `${dynamicText}`,
                            ` Welcome to the <span class="text-red-500">NASA</span> <span class="text-blue-500">Blogger</span>`,
                            ` View Astronomic Pic of the Day - <span class="text-purple-500">Apod</span>`,
                            ` View Satellite views - <span class="text-green-500">Earth</span>`,
                            ` View Mars rover photos - <span class="text-yellow-500">Mars</span>`,
                            ` View Blogs and Create - <span class="text-pink-500">Blogs</span>`,
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        html: true,
                    }}
                />
                {/* Button to scroll to the project details section */}
                <button onClick={handleGetStartedClick} className="hidden lg:inline-block mt-4 px-2 py-1 bg-transparent hover:bg-purple-700 border border-purple-700 text-white rounded-md ">
                    Project details
                </button>
            </div>
            <img src={mainpic} alt="My Image" />
            
            <div id="project-details" className="text-center text-lg text-white px-4">
                {/* Your project details content here */}
                <div className="flex flex-col sm:flex-row justify-center items-center">
                    <div className="sm:w-1/3 sm:mr-4 mb-4 sm:mb-0">
                        <h1 className="text-xl sm:text-4xl mb-2">Project Details</h1>
                        <p>Name: Assignment 2</p>
                        <p>Module code: Application Framework</p>
                        <p>Module code: SE3040</p>
                    </div>
                    <div className="sm:w-1/3 sm:mr-4 mb-4 sm:mb-0">
                        <h1 className="text-xl sm:text-4xl mb-2">Used Technologies</h1>
                        <p>
                            Basic/Frontend: <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="text-sky-400">ReactJs</a>
                        </p>
                        <p>
                            Server/Auth: <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-800">Firebase</a>
                        </p>
                        <p>
                            Database: <a href="https://firebase.google.com/docs/firestore" target="_blank" rel="noopener noreferrer" className="text-amber-700">Firestore</a>
                        </p>
                        <p>
                            Styling: <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400">Tailwind CSS</a> / <a href="https://mui.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Material UI</a>
                        </p>
                        <p>
                            Version Control: <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-orange-700">Git</a> / <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-stone-950">Github</a>
                        </p>
                    </div>
                    <div className="sm:w-1/3">
                        <h1 className="text-xl sm:text-4xl mb-2">Student Details</h1>
                        <p>Name: Baddewithana P</p>
                        <p>IT number: IT21247804</p>
                        <p>Email: <a href="mailto:IT21247804@my.sliit.lk" className="underline">IT21247804@my.sliit.lk</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
