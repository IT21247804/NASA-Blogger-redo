import React, { useState, useEffect } from 'react';

const api_key = process.env.REACT_APP_NASA_KEY;

const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState("");

    useEffect(() => {
        if (earthDate) {
            fetchMarsPhotos();
        }
    }, [earthDate]);

    const fetchMarsPhotos = async () => {
        const res = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${api_key}`
        );
        const data = await res.json();
        setPhotos(data.photos);
    };

    const handleEarthDateChange = (event) => {
        setEarthDate(event.target.value);
    };

    const handleSubmit = () => {
        fetchMarsPhotos();
    };

    return (
        <div className="max-w-screen-md mx-auto mt-8">
            <div className="flex justify-center items-center mb-4">
                <input
                    type="date"
                    value={earthDate}
                    onChange={handleEarthDateChange}
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                    Fetch Mars Photos
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="border border-gray-300 rounded-md p-4">
                        <img src={photo.img_src} alt={`Mars photo ${photo.id}`} className="w-full h-auto" />
                        <p className="text-gray-700">Sol: {photo.sol}</p>
                        <p className="text-gray-700">Earth Date: {photo.earth_date}</p>
                        <p className="text-gray-700">Camera: {photo.camera.full_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarsPhotos;
