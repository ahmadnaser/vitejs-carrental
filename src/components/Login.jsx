import React, { useEffect, useState } from 'react';
import Image from "../assets/images/image.png";
import { useNavigate } from 'react-router-dom';
import GoogleSvg from "../assets/images/icons8-google.svg";
import { useTranslation } from 'react-i18next';
import { setLogin } from '../controller/LoginController';
import LogoImage from '../assets/images/logo.png';


const Login = ({ onLogin }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail || '');
      setPassword(savedPassword || '');
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await setLogin(email, password);
      if (response.success) {
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', true);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.setItem('rememberMe', false);
        }

        const role = response.role;
        if (role === 'administrator') {
          onLogin();
          navigate('/dashboard');
        } else {
          navigate(); 
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className={`flex min-h-screen ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="hidden md:flex w-1/2 flex-grow min-h-screen flex-col justify-between bg-primary-color text-white p-5">
        <div className="w-full flex justify-start">
          <button onClick={toggleLanguage} className="text-md cursor-pointer bg-transparent text-white transition-colors duration-300 hover:text-secondary-color focus:font-bold">
            {i18n.language === 'en' ? 'العربية' : 'EN'}
          </button>
        </div>

        <div className="h-full m-auto flex flex-col justify-between">
          <div className="text-center mt-20">
            <p className="mb-5 text-2xl">{t('welcome_message')}</p>
            <div className="mb-5 flex justify-center">
              <img src={Image} alt="" className="w-[70%] mb-5 rounded-lg" />
            </div>
            <button className="mt-5 py-2.5 px-5 bg-white text-black rounded-full cursor-pointer text-md" >
              {t('go_as_guest')}<span className="inline-flex items-center justify-center mx-2"><i className="ri-glasses-2-line"></i></span>
            </button>
          </div>

          <div className="flex justify-center items-center gap-5 mb-5">
            <a href="#" className="text-white no-underline hover:underline">{t('about_us')}</a>
            <a href="#" className="text-white no-underline hover:underline">{t('contact')}</a>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex-grow min-h-screen bg-bodyBg-color text-white p-5">
        <div className="flex lg:hidden md:hidden justify-start p-2">
          <button onClick={toggleLanguage} className="text-md cursor-pointer bg-transparent text-white transition-colors duration-300 hover:text-secondary-color focus:font-bold">
            {i18n.language === 'en' ? 'العربية' : 'EN'}
          </button>
        </div>

        <div className="h-full w-4/5 m-auto flex flex-col justify-center">
          <div className="flex mt-0 items-center justify-center pt-2.5 mb-20">
            <h2 className="text-md flex m-2.5 font-arabic font-light text-headingColor">{t('name')}</h2>
            <div className="flex items-center justify-center w-10 h-10 bg-secondary-color rounded-full overflow-hidden border-2 border-secondary-color">
              <img src={LogoImage} alt="Logo" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div className="text-center mt-0">
            <h2 className="mb-5 text-4xl">{t('welcome_back')}</h2>
            <form onSubmit={handleLoginClick} className="flex flex-col mt-10">
              <div className='flex flex-col items-center'>
                <input
                  type="email"
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-black font-arabic font-light w-4/5 py-3 px-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-50"
                />
                <input
                  type="password"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-black font-arabic font-light w-4/5 py-3 px-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-50"
                />
              </div>

              <div className="flex justify-between items-center w-4/5 mx-auto gap-10">
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember-checkbox" className="text-sm mx-0 cursor-pointer mt-0.2">{t('remember_me')}</label>
                </div>
                <a href="#" className="text-sm no-underline hover:underline">{t('forgot_password')}</a>
              </div>

              <div className="text-sm flex flex-col gap-2.5 mt-10 items-center">
                <button
                  type="submit"
                  className="w-3/5 h-auto py-2 rounded-full cursor-pointer hover:bg-white "
                  style={{ backgroundColor: '#01d293' }}
                >
                  {t('log_in')}
                </button>
                <button
                  type="button"
                  className="w-3/5 h-auto py-1 bg-gray-100 flex justify-center items-center gap-1.05 rounded-full hover:bg-gray-200 text-black"
                >
                  <img src={GoogleSvg} alt="Google Logo" className="w-8" />
                  {t('log_in_with_google')}
                </button>
              </div>

              {error && <p className="text-red-500 mt-5">{error}</p>}

            </form>
          </div>

          <p className="font-arabic font-light text-center text-2xl py-10 text-gray-100">{t('no_account')} <a href="#" className="font-semibold no-underline hover:underline">{t('sign_up')}</a></p>
          <div className="flex lg:hidden md:hidden justify-center mt-0 mb-10">
            <button className="font-arabic font-light text-lg bg-transparent text-white transition-colors duration-300 hover:bg-secondary-color rounded-full cursor-pointer py-2.5 px-5" >
              {t('go_as_guest')}<span className="mx-2 inline-flex items-center justify-center"><i className="ri-glasses-2-line"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
