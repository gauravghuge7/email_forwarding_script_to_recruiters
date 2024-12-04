import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/").filter(Boolean); // Remove empty segments

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-green-500 p-2 text-white shadow-lg">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 bg-white text-green-700 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* App Title */}
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-lg text-gray-100 space-x-2">
          <Link to="/" className="hover:underline hover:text-white">
            Home
          </Link>
          {pathSegments.map((segment, index) => {
            const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return (
              <span key={index} className="flex items-center space-x-2">
                <span className="text-gray-300">/</span>
                <Link
                  to={fullPath}
                  className={`hover:underline ${
                    index === pathSegments.length - 1
                      ? "font-bold text-white"
                      : "text-gray-200"
                  }`}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </span>
            );
          })}
        </div>

        {/* Email List Button */}
        <button className="bg-white text-green-700 px-4 py-2 rounded-full shadow-lg hover:bg-green-100">
          Join Email List
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-500 to-green-700 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-400">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="p-4 space-y-4">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block p-2 rounded transition ${
                  location.pathname === link.path
                    ? "bg-green-600 text-white"
                    : "hover:bg-green-600 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
