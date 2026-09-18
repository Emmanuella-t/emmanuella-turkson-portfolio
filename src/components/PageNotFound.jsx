import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFEDDA]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-[#401216]/20">404</h1>
          <div className="h-0.5 w-16 bg-[#401216]/10 mx-auto"></div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-[#401216]">Page Not Found</h2>
          <p className="text-[#401216]/70 leading-relaxed">
            Nothing at <span className="font-medium">“{location.pathname}”</span>.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#401216] bg-white border border-[#401216]/10 rounded-lg hover:bg-[#FFEDDA] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

