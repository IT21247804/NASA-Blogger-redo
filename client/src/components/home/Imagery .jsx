import React, { useState } from 'react';

const api_key = process.env.REACT_APP_NASA_KEY;

const EarthImagery = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [date, setDate] = useState('');
    const [imageData, setImageData] = useState(null);

    const fetchImageData = async () => {
        if (latitude && longitude && date) {
            const res = await fetch(
                `https://api.nasa.gov/planetary/earth/imagery?lat=${latitude}&lon=${longitude}&date=${date}&dim=0.15&api_key=${api_key}`
            );
            const imageUrl = await res.blob();
            setImageData(URL.createObjectURL(imageUrl));
        }
    };

    const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event) => {
        setLongitude(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = () => {
        fetchImageData();
    };

    return (
        <div className="max-w-screen-md mx-auto mt-12">
            <div className="flex justify-center items-center mb-4">
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={handleLatitudeChange}
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={handleLongitudeChange}
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                />
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
                    Fetch Earth Imagery
                </button>
            </div>
            {imageData && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">Image Data</h2>
                    <img
                        src={imageData}
                        alt="Earth Imagery"
                        className="block mx-auto cursor-zoom-in bg-gray-200 transition duration-300 hover:bg-gray-100 max-w-full h-auto"
                    />
                    <p>Date: {date}</p>
                </div>
            )}
        </div>
    );
};

export default EarthImagery;
