import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const EarthImagery = () => {
  const { userLoggedIn } = useAuth();

  return (
    <div>
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}

      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-5xl w-full rounded-2xl border-4 border-red-500 bg-black/50 backdrop-blur-sm p-8 md:p-14 text-center shadow-2xl">
          <p className="text-red-400 text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-4">
            Important Notice
          </p>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mb-6">
            This Module Has Been Deprecated By NASA
          </h1>
          <p className="text-slate-300 text-base sm:text-lg md:text-2xl">
            The Earth Imagery endpoint used on this page is no longer supported. Please use the EPIC module for current Earth data.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EarthImagery;
