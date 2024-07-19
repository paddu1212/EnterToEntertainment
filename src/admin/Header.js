import React from 'react';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    window.location.reload();
    
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Wellcome Admin</h1>
        </div>
        <div className="flex items-center space-x-4">
        <div className="relative">
            
            {/* <svg
              className="absolute right-3 top-3 h-2 w-2 text-white pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                fill="currentColor"
                d="M412 28.6L383.4 0 206 177.4 28.6 0 0 28.6l206 206z"
              />
            </svg> */}
          </div>
          <div className="relative">
            <button
              className="bg-gray-800 text-white rounded-md py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
