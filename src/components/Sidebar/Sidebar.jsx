import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./Sidebar.css";
import { useTranslation } from 'react-i18next';
import closeIcon from "../../assets/images/Sidebar.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/login");
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
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
        <img src={isOpen ? closeIcon : closeIcon} alt="Toggle Sidebar" />
        </button>

        <div className="logo">
          <h2>{t('name')}</h2>
          <div className={`image-logo ${i18n.language === 'ar' ? 'rtl' : ''}`}>
            <img src="src/assets/images/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="sidebar__content">
          <div className="menu">
            <ul className="nav__list">
              {navLinks.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__link" : "nav__link"
                    }
                  >
                    <i className={item.icon}></i>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar__bottom">
            <span className="logout" onClick={handleLogout}>
              <i className="ri-logout-circle-r-line"></i> Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};



export default Sidebar;
