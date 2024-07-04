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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
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
          <div className="login-logo">
            <h2><span><i className="ri-taxi-line"></i></span>{" "}UberX</h2>
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
        </div>
      </div>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>العربية</button>
      </div>
    </div>
  );
};

export default Login;
