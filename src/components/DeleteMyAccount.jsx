import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import logo_black from '../assets/images/logo_black.png';
import deleteUserByPhoneEmail from '../controller/userController';
import PropTypes from 'prop-types';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const result = await deleteUserByPhoneEmail(phone, email, password);
      if (result.success) {
        setMessage(result.message);
        setMessageType('success'); 
      } else {
        setMessage(result.message || 'Failed to delete your account.');
        setMessageType('error');
      }
    } catch (error) {
      const { response } = error;
      if (response) {
        const { status } = response;
        const errorMessages = {
          404: 'No account found with the provided details. Please check your email and phone number.',
          401: 'Incorrect password. Please try again.',
          default: 'Something went wrong. Please try again.',
        };
        setMessage(errorMessages[status] || errorMessages.default);
        setMessageType('error');
      } else {
        setMessage('Failed to delete your account. Please try again later.');
        setMessageType('error'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-black to-[#C3A264] w-full min-h-screen text-gold relative font-montserrat text-white overflow-x-hidden">
      <Header />
      <Fields
        email={email}
        phone={phone}
        password={password}
        setEmail={setEmail}
        setPhone={setPhone}
        setPassword={setPassword}
        loading={loading}
        handleDeleteAccount={handleDeleteAccount}
        message={message}
        messageType={messageType}
      />
      <Footer navigate={navigate} />
    </div>
  );
};

const Header = () => (
  <header className="flex flex-col items-center justify-center">
    <img
      src={logo_black}
      alt="Mee3ad Logo"
      className="h-18 w-16 md:h-24 md:w-24 animate-bounce mb-4 mt-10"
    />
    <h1 className="text-3xl md:text-4xl font-bold mb-6">
      Delete My Account
    </h1>
    <p className="text-base md:text-lg text-center">
      Please provide your email, phone number, and password to proceed.
    </p>
  </header>
);

const Fields = ({
  email,
  phone,
  password,
  setEmail,
  setPhone,
  setPassword,
  loading,
  handleDeleteAccount,
  message,
  messageType
}) => (
  <form
    className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-8"
    onSubmit={handleDeleteAccount}
  >
    <div className="mb-6">
      <label className="flex items-center mb-2 text-[#C3A264]">
        <FaEnvelope className="text-[#C3A264] mr-2" />
        <span className="ml-2">Email Address</span>
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 rounded bg-gray-200 text-[#C3A264] focus:outline-none focus:ring-2 focus:ring-[#C3A264]"
        autoComplete="new-email"
        required
      />
    </div>

    <div className="mb-6">
      <label className="flex items-center mb-2 text-[#C3A264]">
        <FaPhone className="text-[#C3A264] mr-2" />
        <span className="ml-2">Phone Number</span>
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
        className="w-full px-4 py-3 rounded bg-gray-200 text-[#C3A264] focus:outline-none focus:ring-2 focus:ring-[#C3A264]"
        autoComplete="new-phone" 
        required
      />
    </div>

    <div className="mb-6">
      <label className="flex items-center mb-2 text-[#C3A264]">
        <span className="ml-2">Password</span>
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full px-4 py-3 rounded bg-gray-200 text-[#C3A264] focus:outline-none focus:ring-2 focus:ring-[#C3A264]"
        autoComplete="new-password"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-[#C3A264] text-[#C3A264] py-3 px-4 rounded font-bold hover:bg-[#C3A264] hover:text-white transition-colors duration-200"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Delete My Account'}
    </button>

    {message && (
      <div
        className={`mt-4 p-4 rounded ${
          messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {message}
      </div>
    )}
  </form>
);

Fields.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPhone: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.oneOf(['success', 'error']),
};

Fields.defaultProps = {
  message: '',
  messageType: 'error',
};

const Footer = ({ navigate }) => (
  <div className="bg-gradient-to-r from-black via-black to-[#C3A264] w-full p-6">
    <div className="flex justify-center items-center space-x-4 text-white">
      <button onClick={() => navigate('/privacy-policy')} className="flex items-center space-x-2">
        <FaShieldAlt />
        <span>Privacy Policy</span>
      </button>
      <button onClick={() => navigate('/terms-conditions')} className="flex items-center space-x-2">
        <FaFileContract />
        <span>Terms and Conditions</span>
      </button>
    </div>
  </div>
);

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
};



export default DeleteAccount;
