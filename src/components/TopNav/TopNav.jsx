import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";
import closeIcon from "../../assets/images/Sidebar.png";
import { useTranslation } from 'react-i18next';

const TopNav = ({ isSidebarOpen, onToggleSidebar }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`fixed top-0 ${isSidebarOpen ? `${isRTL ? 'right-[300px] w-[calc(100%-300px)]' : 'left-[300px] w-[calc(100%-300px)]'}` : `${isRTL ? 'right-0' : 'left-0'} w-full`} z-[999] ${isRTL ? 'rtl' : 'ltr'} bg-primary-color h-[70px] leading-[70px] transition-all duration-300`}>
      <div className="flex items-center justify-between px-[30px] h-full">
        <button
          className="bg-primary-color p-1 rounded-full transition-all duration-300"
          onClick={onToggleSidebar}
          style={{ top: '4%', transform: 'translateY(-50%)', position: 'fixed', [isSidebarOpen ? (isRTL ? 'right' : 'left') : (isRTL ? 'right' : 'left')]: isSidebarOpen ? '300px' : '-1px' }}
        >
          <img src={closeIcon} alt="Toggle Sidebar" className="w-9 h-9" />
        </button>

        <div className="relative p-10 justify-center flex-grow">
          <div className="flex items-center justify-between bg-[#0b0c28] px-[10px] rounded-md cursor-pointer h-[40px] w-full max-w-[300px]">
            <input
              type="text"
              placeholder={t('Search')}
              className="bg-transparent border-none outline-none text-small-text-color placeholder-small-text-color w-full"
            />
            <span>
              <i className="ri-search-line text-small-text-color"></i>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-[2rem] justify-end">
          <span className="relative">
            <i className="ri-notification-4-line text-small-text-color text-[1.2rem]  md:text-[1.5rem]  lg:text-[1.8rem] cursor-pointer"></i>
            <span className="absolute top-[25%] right-[-10%] w-[13px] h-[13px]  md:w-[16px] md:h-[16px]  lg:w-[18px] lg:h-[18px] flex items-center justify-center bg-secondary-color rounded-full text-white text-[0.8rem]">1</span>
          </span>
          <div className="flex items-center justify-end">
            <Link to="/settings">
            <img src={profileImg} alt="Profile" className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]  lg:w-[40px] lg:h-[40px] rounded-full object-cover" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
