import React from 'react';
import Image from "../assets/images/image.png";
import { useNavigate } from 'react-router-dom';
import GoogleSvg from "../assets/images/icons8-google.svg";
import { useTranslation } from 'react-i18next';
import '../styles/login.css';

const Login = ({ onLogin }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  React.useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className={`login-main ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="login-left">
        <div className="language-switcher">
          <button onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'العربية' : 'EN'}
          </button>
        </div>
        <div className="login-left-container">
            <div className="login-center">
              <p>{t('welcome_message')}</p>
              <div className="login-left-image">
                <img src={Image} alt=""/>
              </div>
              <button className="guest-button" onClick={handleLoginClick}>
                {t('go_as_guest')}<span><i className="ri-glasses-2-line"></i></span>
              </button>
            </div>
            <div className="info">
              <a href="#">{t('about_us')}</a>
              <a href="#">{t('contact')}</a>
            </div>
          </div>
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="language-switcher-mobile">
          <button onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'العربية' : 'EN'}
          </button>
        </div>
        <div className="login-logo">
          <h2>{t('name')}</h2>
          <div className={`image-logo ${i18n.language === 'ar' ? 'rtl' : ''}`}>
            <img src="src/assets/images/logo.png" alt="Logo" />
          </div>
        </div>
          <div className="login-center">
            <h2>{t('welcome_back')}</h2>
            <form onSubmit={handleLoginClick}>
              <input type="email" placeholder={t('email')} required />
              <input type='password' placeholder={t('password')} required />
              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">{t('remember_me')}</label>
                </div>
                <a href="#" className="forgot-pass-link">{t('forgot_password')}</a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">{t('log_in')}</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  {t('log_in_with_google')}
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">{t('no_account')} <a href="#">{t('sign_up')}</a></p>
          <div className="guest-button-mobile">
          <button className="guest-button" onClick={handleLoginClick}>
            {t('go_as_guest')}<span><i className="ri-glasses-2-line"></i></span>
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
