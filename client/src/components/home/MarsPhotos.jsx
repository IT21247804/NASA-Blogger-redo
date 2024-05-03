// import React, { useState, useEffect } from 'react';

// const api_key = process.env.REACT_APP_NASA_KEY;

// const MarsPhotos = () => {
//     const [photos, setPhotos] = useState([]);
//     const [earthDate, setEarthDate] = useState("");
//     const [selectedCamera, setSelectedCamera] = useState("");

//     useEffect(() => {
//         if (earthDate) {
//             fetchMarsPhotos();
//         }
//     }, [earthDate, selectedCamera]);

//     const fetchMarsPhotos = async () => {
//         let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${api_key}`;
//         if (selectedCamera) {
//             apiUrl += `&camera=${selectedCamera}`;
//         }
//         const res = await fetch(apiUrl);
//         const data = await res.json();
//         setPhotos(data.photos);
//     };

//     const handleEarthDateChange = (event) => {
//         setEarthDate(event.target.value);
//     };

//     const handleCameraChange = (event) => {
//         setSelectedCamera(event.target.value);
//     };

//     const handleSubmit = () => {
//         fetchMarsPhotos();
//     };

//     return (
//         <div className="max-w-screen-md mx-auto mt-8">
//             <div className="flex justify-center items-center mb-4">
//                 <input
//                     type="date"
//                     value={earthDate}
//                     onChange={handleEarthDateChange}
//                     className="border border-gray-300 rounded-md px-3 py-1 mr-2"
//                 />
//                 <select
//                     value={selectedCamera}
//                     onChange={handleCameraChange}
//                     className="border border-gray-300 rounded-md px-3 py-1 mr-2"
//                 >
//                     <option value="">Select Camera</option>
//                     <option value="fhaz">Front Hazard Avoidance Camera</option>
//                     <option value="rhaz">Rear Hazard Avoidance Camera</option>
//                     <option value="mast">Mast Camera</option>
//                     <option value="chemcam">Chemistry and Camera Complex</option>
//                     <option value="mahli">Mars Hand Lens Imager</option>
//                     <option value="mardi">Mars Descent Imager</option>
//                     <option value="navcam">Navigation Camera</option>
//                 </select>
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-blue-500 text-white px-4 py-1 rounded-md"
//                 >
//                     Fetch Mars Photos
//                 </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {photos.map((photo) => (
//                     <div key={photo.id} className="border border-gray-300 rounded-md p-4">
//                         <img src={photo.img_src} alt={`Mars photo ${photo.id}`} className="w-full h-auto" />
//                         <p className="text-gray-700">Sol: {photo.sol}</p>
//                         <p className="text-gray-700">Earth Date: {photo.earth_date}</p>
//                         <p className="text-gray-700">Camera: {photo.camera.full_name}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MarsPhotos;
import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, Pagination } from '@mui/material';

const api_key = process.env.REACT_APP_NASA_KEY;

const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState("");
    const [selectedCamera, setSelectedCamera] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // New state to store total pages

    useEffect(() => {
        if (earthDate) {
            fetchMarsPhotos();
        }
    }, [earthDate, selectedCamera, currentPage]);

    const fetchMarsPhotos = async () => {
        let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${api_key}&page=${currentPage}`;
        if (selectedCamera) {
            apiUrl += `&camera=${selectedCamera}`;
        }
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPhotos(data.photos);
        setTotalPages(Math.ceil(data.total_photos / 25)); // Assuming 25 photos per page
    };

    const handleEarthDateChange = (event) => {
        setEarthDate(event.target.value);
    };

    const handleCameraChange = (event) => {
        setSelectedCamera(event.target.value);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleSubmit = () => {
        setCurrentPage(1); // Reset page to 1 when submitting new query
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
                <select
                    value={selectedCamera}
                    onChange={handleCameraChange}
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                >
                    <option value="">Select Camera</option>
                    <option value="fhaz">Front Hazard Avoidance Camera</option>
                    <option value="rhaz">Rear Hazard Avoidance Camera</option>
                    <option value="mast">Mast Camera</option>
                    <option value="chemcam">Chemistry and Camera Complex</option>
                    <option value="mahli">Mars Hand Lens Imager</option>
                    <option value="mardi">Mars Descent Imager</option>
                    <option value="navcam">Navigation Camera</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                    Fetch Mars Photos
                </button>
            </div>
            <ImageList cols={3} gap={8}>
                {photos.map((photo) => (
                    <ImageListItem key={photo.id}>
                        <img src={photo.img_src} alt={`Mars photo ${photo.id}`} />
                        <p className="text-gray-700">Sol: {photo.sol}</p>
                        <p className="text-gray-700">Earth Date: {photo.earth_date}</p>
                        <p className="text-gray-700">Camera: {photo.camera.full_name}</p>
                    </ImageListItem>
                ))}
            </ImageList>
            <div className="flex justify-center mt-4">
                <Pagination
                    count={totalPages} // Set the total number of pages
                    page={currentPage} // Set the current page
                    onChange={handlePageChange} // Handle page change event
                />
                <p className="ml-4 text-gray-700">Current Page: {currentPage}</p>

            </div>
        </div>
    );
};

export default MarsPhotos;


