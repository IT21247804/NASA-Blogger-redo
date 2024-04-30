import React, { useState, useEffect } from 'react';

const api_key = process.env.REACT_APP_NASA_KEY;

const Apod = () => {
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
            );
            const data = await res.json();
            setPhotoData(data);
        } 
    }, []);

    if (!photoData) return <div />;

    return (
        <div className="max-w-screen-md mx-auto mt-8 flex">
            <div className="w-3/5 mr-4">
                {photoData.media_type === "image" ? (
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
                    <h1 className="text-2xl font-bold mb-2">{photoData.title}</h1>
                    <p className="text-gray-700 mb-2">{photoData.date}</p>
                    <p className="text-gray-800">{photoData.explanation}</p>
                </div>
            </div>
        </div>
    );
}

export default Apod;

