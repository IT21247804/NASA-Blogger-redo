import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useAuth } from '../../contexts/authContext';

const apiKey = process.env.REACT_APP_NASA_KEY || 'DEMO_KEY';
const ITEMS_PER_PAGE = 9;

const COLLECTIONS = [
  { value: 'natural', label: 'Natural Color' },
  { value: 'enhanced', label: 'Enhanced Color' },
  { value: 'aerosol', label: 'Aerosol Index' },
  { value: 'cloud', label: 'Cloud Fraction' },
];

const toDateString = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value.slice(0, 10);
  if (value.date) return String(value.date).slice(0, 10);
  return '';
};

const getCoordinates = (item) => {
  const primary = item?.centroid_coordinates;
  const nested = item?.coords?.centroid_coordinates;
  const lat = primary?.lat ?? nested?.lat;
  const lon = primary?.lon ?? nested?.lon;
  if (lat === undefined || lon === undefined) return 'N/A';
  return `${Number(lat).toFixed(2)}, ${Number(lon).toFixed(2)}`;
};

const buildImageUrl = (item, collection) => {
  const [year, month, day] = String(item.date).slice(0, 10).split('-');
  return `https://api.nasa.gov/EPIC/archive/${collection}/${year}/${month}/${day}/jpg/${item.image}.jpg?api_key=${apiKey}`;
};

const MarsPhotos = () => {
  const { userLoggedIn } = useAuth();

  const [collection, setCollection] = useState('natural');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxDate = availableDates[0] || new Date().toISOString().slice(0, 10);

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const fetchAvailableDates = async (activeCollection) => {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/${activeCollection}/available?api_key=${apiKey}`
    );

    if (!res.ok) {
      throw new Error('Failed to load available EPIC dates.');
    }

    const data = await res.json();
    return data
      .map(toDateString)
      .filter(Boolean)
      .sort((a, b) => (a < b ? 1 : -1));
  };

  const fetchMetadata = async (activeCollection, date) => {
    const endpoint = date
      ? `https://api.nasa.gov/EPIC/api/${activeCollection}/date/${date}?api_key=${apiKey}`
      : `https://api.nasa.gov/EPIC/api/${activeCollection}?api_key=${apiKey}`;

    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error('Failed to load EPIC metadata.');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  };

  const loadData = async ({ activeCollection, date }) => {
    setLoading(true);
    setError('');

    try {
      const metadata = await fetchMetadata(activeCollection, date);
      setItems(metadata);
      setCurrentPage(1);

      if (!metadata.length) {
        setError('No imagery found for this date/collection. Try a different date or switch collection.');
      }
    } catch (err) {
      setItems([]);
      setError(err.message || 'Unexpected error while fetching EPIC data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      setError('');

      try {
        const dates = await fetchAvailableDates(collection);
        setAvailableDates(dates);

        const initialDate = dates[0] || '';
        setSelectedDate(initialDate);

        const metadata = await fetchMetadata(collection, initialDate);
        setItems(metadata);
        setCurrentPage(1);

        if (!metadata.length) {
          setError('No imagery available for the most recent date in this collection.');
        }
      } catch (err) {
        setItems([]);
        setAvailableDates([]);
        setSelectedDate('');
        setError(err.message || 'Unexpected error while initializing EPIC view.');
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [collection]);

  const handleSearch = () => {
    loadData({ activeCollection: collection, date: selectedDate });
  };

  const handleLoadLatest = () => {
    const latest = availableDates[0] || '';
    setSelectedDate(latest);
    loadData({ activeCollection: collection, date: latest });
  };

  return (
    <div>
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h1 className="text-2xl md:text-3xl text-white font-bold text-center mb-2">EPIC Earth Imagery</h1>
        <p className="text-center text-slate-300 mb-6">
          NASA DSCOVR EPIC collections with metadata, date filters, and gallery view.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          <select
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white"
          >
            {COLLECTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            max={maxDate}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>

          <button
            onClick={handleLoadLatest}
            className="bg-slate-700 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            Latest
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mb-6">
          Available dates in selected collection: {availableDates.length}
        </p>

        {error && <p className="text-center text-red-400 mb-6">{error}</p>}

        {!error && !loading && items.length === 0 && (
          <p className="text-center text-slate-300 mb-6">No records returned.</p>
        )}

        {pagedItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pagedItems.map((item) => (
              <article key={`${item.identifier}-${item.image}`} className="rounded-lg overflow-hidden border border-white/20 bg-black/30 backdrop-blur-sm">
                <img
                  src={buildImageUrl(item, collection)}
                  alt={item.caption || item.image}
                  className="w-full h-60 object-cover"
                  loading="lazy"
                />
                <div className="p-3 text-slate-100">
                  <p className="text-sm font-semibold mb-1">{String(item.date).replace('T', ' ').replace('Z', '')}</p>
                  <p className="text-sm text-slate-300 mb-2 line-clamp-3">{item.caption || 'No caption available.'}</p>
                  <p className="text-xs text-slate-400">Centroid: {getCoordinates(item)}</p>
                  <p className="text-xs text-slate-400">Image ID: {item.identifier || 'N/A'}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {items.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-8 mb-10">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              sx={{ '& .MuiPaginationItem-root': { color: '#d1d5db' } }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarsPhotos;
