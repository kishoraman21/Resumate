import React from 'react';

export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-blue-400 mb-4">404</h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          {/* <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            onClick={() => window.history.back()}
          >
            Go Back
          </button> */}
          <button 
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-6 rounded-lg border border-gray-700 transition-colors duration-200"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Still having trouble? 
            <a href="#" className="text-blue-400 hover:text-blue-300 ml-1 underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};