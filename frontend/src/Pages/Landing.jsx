import { Link } from "react-router-dom";
import homepageImg from "../assets/homepage-img.jpeg";
import useAuthStore from "../store/authStore";
import LogoutBtn from "../components/LogoutBtn";

export default function Landing() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white text-gray-800">
      {/* Modern Navbar with subtle shadow */}
      <nav className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/80 shadow-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">IoT ChainTrack</h1>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium transition-all hover:bg-blue-700">
                Dashboard
              </Link>
              <LogoutBtn className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all font-medium" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all font-medium">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium transition-all hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with modern layout */}
      <main className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 py-16">
          {/* Left side content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text">
              Track Every IoT Device from Manufacture to Activation
            </h2>
            <p className="text-lg mb-8 text-gray-600 max-w-lg">
              Our blockchain-based system ensures complete transparency and security for your IoT devices throughout the entire supply chain.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium transition-all hover:bg-blue-700">
                Get Started
              </Link>
              <Link to="/about" className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium transition-all hover:bg-blue-50">
                Learn More
              </Link>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Tamper-Proof Records</h3>
                <p className="text-gray-600 text-sm">Blockchain technology ensures data integrity throughout the supply chain.</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Real-time Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor device status and location at any point in the supply chain.</p>
              </div>
            </div>
          </div>
          
          {/* Right side image */}
          <div className="flex-1 mt-8 md:mt-0">
            <img
              src={homepageImg}
              alt="IoT Supply Chain"
              className="w-full rounded-2xl shadow-xl object-cover transform transition-all hover:scale-105"
            />
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="py-12 text-center">
          <h3 className="text-xl font-medium mb-8 text-gray-600">Trusted by Industry Leaders</h3>
          <div className="flex justify-center flex-wrap gap-12 opacity-70">
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
            <div className="w-24 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    </div>
  );
}