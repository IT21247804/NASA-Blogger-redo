import React, { useState, useEffect } from 'react';
import {  Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'

const api_key = process.env.REACT_APP_NASA_KEY;

const Apod = () => {
    const [photoData, setPhotoData] = useState(null);
    const [date, setDate] = useState(""); // State to store the date input value
    const { userLoggedIn } = useAuth()

    useEffect(() => {
        // Fetch image on component mount
        fetchPhoto();
    }, []);

    const fetchPhoto = async () => {
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`
        );
        const data = await res.json();
        setPhotoData(data);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = () => {
        fetchPhoto();
    };

    if (!photoData) return <div />;

    return (
        <div>
        {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
        <div className="max-w-screen-md mx-auto mt-8">
            <div className="flex justify-center items-center mb-4">
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                    Fetch Image
                </button>
            </div>
            <div className="flex">
                <div className="w-3/5 mr-4">
                    {photoData.media_type === 'image' ? (
                        <img
                            src={photoData.url}
                            alt={photoData.title}
                            className="w-full rounded-lg shadow-md"
                        />
                    ) : (
                        <iframe
                            title="space-video"
                            src={photoData.url}
                            frameBorder="0"
                            gesture="media"
                            allow="encrypted-media"
                            allowFullScreen
                            className="photo w-full rounded-lg shadow-md"
                        />
                    )}
                </div>
                <div className="w-2/5">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-2">
                            {photoData.title}
                        </h1>
                        <p className="text-gray-700 mb-2">{photoData.date}</p>
                        <p className="text-gray-800">{photoData.explanation}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Apod;


