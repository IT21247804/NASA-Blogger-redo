import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, Pagination, PaginationItem } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';


const api_key = process.env.REACT_APP_NASA_KEY;


const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState("");
    const [selectedCamera, setSelectedCamera] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // New state to store total pages
    const [error, setError] = useState(null);

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
        <div className="max-w-screen-md mx-auto mt-12">
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
                    Search
                </button>
              
            </div>
            <div className="flex justify-center"> {/* Center the content horizontally */}
                <h1 className='text-white text-sm md:text-base lg:text-lg xl:text-1xl font-bold'>Note: Check around 2014</h1>
            </div>
            <ImageList cols={3} gap={8}>
                {photos.map((photo) => (
                    <ImageListItem key={photo.id}>
                        <img src={photo.img_src} alt={`Mars photo ${photo.id}`} />
                        <ImageListItemBar
            title={photo.sol}
            subtitle={photo.camera.full_name}
       
            
          />
                    </ImageListItem>
                ))}
            </ImageList>
            <div className="flex justify-center mt-4">
               
            <p className="ml-4 text-zinc-50"> {currentPage -1}</p>
    <Pagination
        count={totalPages} // Set the total number of pages
        page={currentPage} // Set the current page
        onChange={handlePageChange} // Handle page change event
        
       
        sx={{ '& .MuiPaginationItem-root': { color: '#d1d5db' } }} // Customize pagination color
    />
    <p className="ml-4 text-zinc-50"> {currentPage +1}</p>
   
</div>

        </div>
    );
};

export default MarsPhotos;


