import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isSidebarOpen }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const isRTL = i18n.language === 'ar';

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleSubmenu = (index, hasSubmenu) => {
    if (hasSubmenu) {
      setExpandedMenu(expandedMenu === index ? null : index);
    }
  };

  React.useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-40 h-full bg-primary-color p-5 transition-transform duration-300 ${isSidebarOpen ? 'w-[300px]' : `${isRTL ? 'translate-x-full' : '-translate-x-full'}`} ${isRTL ? 'rtl' : 'ltr'} flex flex-col`}>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <h2 className="text-lg mx-1.5 font-arabic font-light text-heading-color">{t('name')}</h2>
          <div className="flex items-center justify-center w-10 h-10 bg-secondary-color rounded-full overflow-hidden border-2 border-secondary-color">
            <img src="src/assets/images/logo.png" alt="Logo" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-8 text-small-text-color">
          {navLinks.map((item, index) => (
            <li key={index}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSubmenu(index, item.submenu.length > 0)}>
                {item.submenu.length > 0 ? (
                  <div className={`flex items-center gap-2.5 transition-colors duration-300 ${expandedMenu === index ? 'bg-[#b7ffe913] text-white py-1.5 px-2.5 rounded-md' : 'text-secondary-color'}`}>
                    <i className={item.icon}></i>
                    {t(item.display)}
                  </div>
                ) : (
                  <NavLink to={item.path} className={({ isActive }) => `flex items-center gap-2.5 transition-colors duration-300 ${isActive ? 'bg-[#b7ffe913] text-white py-1.5 px-2.5 rounded-md' : 'text-secondary-color'}`}>
                    <i className={item.icon}></i>
                    {t(item.display)}
                  </NavLink>
                )}
                {item.submenu.length > 0 && (
                  <span className={`transition-transform duration-300 ${expandedMenu === index ? 'rotate-180' : 'rotate-0'}`}>
                    <i className="ri-arrow-down-s-line"></i>
                  </span>
                )}
              </div>
              {item.submenu.length > 0 && expandedMenu === index && (
                <ul className="pl-10 mt-2 flex flex-col gap-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.path} className="text-secondary-color hover:text-white transition-colors duration-300">
                        {t(subItem.display)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center gap-2.5 cursor-pointer text-small-text-color transition-colors duration-300 hover:text-white mb-10" onClick={handleLogout}>
        <i className="ri-logout-circle-r-line"></i> {t("Logout")}
      </div>
    </div>
  );
};

export default Sidebar;
