import { FaMapMarkerAlt, FaPhone,FaTrash, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import logo_black from '../assets/images/logo_black.png';
import appStore from '../assets/images/app-store.png';
import playStore from '../assets/images/playstore.png';
import mee3adApp1 from '../assets/images/mee3ad-app1.jpg';
import mee3adApp2 from '../assets/images/mee3ad-app2.jpg';
import mee3adApp3 from '../assets/images/mee3ad-app3.jpg';
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'
import useInView from './UseInView';

const Landing = () => {
  const navigate = useNavigate();

  const preloadImages = (images) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };
  
    const handleComingSoon = () => {
      alert("Coming Soon");
    };
  
    return (
      <header className="flex items-center justify-between p-4 shadow-lg bg-gradient-to-r from-black via-black to-[#C3A264]">
        
        <div className="flex items-center">
          <img src={logo_black} alt="Fanatic Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="ml-2 text-lg sm:text-xl font-bold text-white">Mee3ad</h1>
        </div>
  
        <nav className="hidden sm:flex flex-1 justify-center">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <a href="#home" className="text-white font-medium hover:text-[#C3A264]">
                Home
              </a>
            </li>
            <li>
              <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                Services
              </button>
            </li>
            <li>
              <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                Projects
              </button>
            </li>
            <li>
              <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                Blog
              </button>
            </li>
            <li>
              <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                Contact
              </button>
            </li>
          </ul>
        </nav>
  
        <div className="flex sm:hidden">
          <button onClick={handleComingSoon} className="text-white font-medium">
            <svg className="h-8 w-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4 5h16M4 12h16M4 19h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
  
        {isMobileMenuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-black bg-opacity-90">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <a href="#home" className="text-white font-medium hover:text-[#C3A264]">
                  Home
                </a>
              </li>
              <li>
                <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                  Services
                </button>
              </li>
              <li>
                <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        )}
  
        {/* Action Buttons */}
        <div className="hidden sm:flex space-x-4">
          <button onClick={handleComingSoon} className="text-white font-medium hover:text-[#C3A264]">
            Log in
          </button>
          <button onClick={handleComingSoon} className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-[#C3A264]">
            Get Started
          </button>
        </div>
      </header>
    );
  };
  


  const Intro = () => {
    useEffect(() => {
      preloadImages([mee3adApp1, mee3adApp2, mee3adApp3]);
    }, []);
  
    const [textRef, textInView] = useInView({ threshold: 0.1 });
    const [device1Ref, device1InView] = useInView({ threshold: 0.1 });
    const [device2Ref, device2InView] = useInView({ threshold: 0.1 });
    const [device3Ref, device3InView] = useInView({ threshold: 0.1 });
  
    return (
      <div className="bg-gradient-to-r from-black via-black to-[#C3A264] min-h-screen flex flex-col items-center justify-center p-6 lg:p-10">
        
        {/* Text Section */}
        <div
          ref={textRef}
          className={`text-center text-white mb-6 lg:mb-8 ${textInView ? 'animate-fade-in-up' : ''}`}
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 font-sans">Mee3ad App</h1>
          <p className="text-sm lg:text-lg mb-4 mt-6 lg:mt-10 max-w-lg mx-auto font-sans leading-relaxed">
            All-in-one app designed to streamline appointments and management for barbershops and beauty salons.
          </p>
        </div>
  
        {/* Top Devices */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8 mb-6 lg:mb-0 p-0">
          <div ref={device1Ref} className={`${device1InView ? 'animate-slide-in-left' : ''}`}>
            <div className="flex p-0 m-0" style={{ transform: 'scale(0.75)', marginBottom: '-80px' }}>
              <DeviceFrameset device="iPhone X" color="gold">
                <img src={mee3adApp2} alt="Mobile Screen 2" className="w-full h-auto" />
              </DeviceFrameset>
            </div>
          </div>
  
          <div ref={device2Ref} className={`${device2InView ? 'animate-slide-in-right' : ''}`}>
            <div className="flex p-0 m-0" style={{ transform: 'scale(0.75)', marginBottom: '-80px' }}>
              <DeviceFrameset device="iPhone X" color="gold">
                <img src={mee3adApp1} alt="Mobile Screen 1" className="w-full h-auto" />
              </DeviceFrameset>
            </div>
          </div>
        </div>
  
        <div className="flex justify-center items-center mt-0 p-0">
          <div ref={device3Ref} className={`${device3InView ? 'animate-slide-in-up' : ''}`}>
            <div className="flex p-0 m-0" style={{ transform: 'scale(0.75)', marginTop: '-50px' }}>
              <DeviceFrameset device="iPhone X" color="gold">
                <img src={mee3adApp3} alt="Mobile Screen 3" className="w-full h-auto" />
              </DeviceFrameset>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  const AppDownload = () => {
    const [ref, inView] = useInView({ threshold: 0.10 });
  
    return (
      <div
        ref={ref}
        className={`bg-gradient-to-r from-black via-black to-[#C3A264] flex flex-col items-center space-y-6 transition-opacity duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex space-x-4">
          {/* App Store Button */}
          <a
            href="https://www.apple.com/app-store"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center ${
              inView ? 'animate-slide-in-up' : ''
            }`}
          >
            <img
              src={appStore}
              alt="App Store"
              className="h-6 w-auto mr-3"
            />
            <div className="text-left">
              <p className="text-xs">Download on the</p>
              <p className="text-lg font-semibold">App Store</p>
            </div>
          </a>
  
          {/* Google Play Button */}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center ${
              inView ? 'animate-slide-in-up' : ''
            }`}
          >
            <img
              src={playStore}
              alt="Google Play"
              className="h-6 w-auto mr-3"
            />
            <div className="text-left">
              <p className="text-xs">GET IT ON</p>
              <p className="text-lg font-semibold">Google Play</p>
            </div>
          </a>
        </div>
      </div>
    );
  };
  
  const ContactUs = () => {
    const [infoRef, infoInView] = useInView({ threshold: 0.1 });
    const [formRef, formInView] = useInView({ threshold: 0.1 });
  
    return (
      <div className="bg-gradient-to-r from-black via-black to-[#C3A264] p-6 rounded-lg shadow-lg flex flex-col lg:flex-row justify-center space-y-6 lg:space-x-6 lg:space-y-0 text-left mt-6 lg:mt-10">
        
        {/* Left Section: Contact Info */}
        <div
          ref={infoRef}
          className={`lg:w-1/3 transition-opacity duration-1000 ${
            infoInView ? 'animate-slide-in-up' : ''
          }`}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-[#C3A264] text-2xl font-semibold">Get in touch</h2>
            <p className="text-white text-md">Contact us directly using the contact information below.</p>
            <div className="border-b border-gray-600 my-4 w-2/3"></div>
  
            {/* Office Location */}
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-2xl text-[#C3A264]" />
              <div>
                <p className="text-white text-md font-bold">Our Office Location</p>
                <p className="text-white text-sm">Ramallah, West Bank, Palestine</p>
              </div>
            </div>
  
            {/* Phone */}
            <div className="flex items-start space-x-3">
              <FaPhone className="text-2xl text-[#C3A264]" />
              <div>
                <p className="text-white text-md font-bold">Phone</p>
                <p className="text-white text-sm">1700 180 185</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Section: Form */}
        <div
          ref={formRef}
          className={`bg-white p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/2 transition-opacity duration-1000 ${
            formInView ? 'animate-slide-in-up' : ''
          }`}
        >
          <h2 className="text-[#C3A264] text-xl font-semibold mb-4">Send E-mail Message</h2>
          <form>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
  
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter a valid email address"
              />
            </div>
  
            {/* Message Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
            </div>
  
            {/* Terms Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-[#C3A264]" />
                <span className="ml-2 text-gray-700">I accept the <a href="#" className="text-[#C3A264]">Terms of Service</a></span>
              </label>
            </div>
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-[#C3A264] text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-opacity-80 transition duration-300"
              >
                Submit your request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  
  const Footer = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });
  
    return (
      <div
        ref={ref}
        className={`bg-gradient-to-r from-black via-black to-[#C3A264] w-full p-6 transition-opacity duration-1000 ${
          inView ? 'animate-slide-in-up' : ''
        }`}
      >
        <div className="flex justify-center items-center space-x-4 text-white">
          <button
            onClick={() => navigate('/delete-my-account')}
            className="flex items-center space-x-2 text-white font-bold text-sm md:text-base hover:text-opacity-80 transition duration-300"
          >
            <FaTrash className="text-lg" />
            <span>Delete My Account</span>
          </button>
          <button
            onClick={() => navigate('/privacy-policy')}
            className="flex items-center space-x-2 font-bold text-sm md:text-base hover:text-opacity-80 transition duration-300"
          >
            <FaShieldAlt className="text-lg" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => navigate('/terms-conditions')}
            className="flex items-center space-x-2 font-bold text-sm md:text-base hover:text-opacity-80 transition duration-300"
          >
            <FaFileContract className="text-lg" />
            <span>Terms and Conditions</span>
          </button>
        </div>
      </div>
    );
  };
  
  

  return (
    <div className="bg-gradient-to-r from-black via-black to-[#C3A264] w-full min-h-screen text-gold relative font-montserrat text-white overflow-x-hidden">
      <Header />
      <Intro />
      <AppDownload />
      <ContactUs />
      <Footer />
    </div>
  );
};  

export default Landing;
