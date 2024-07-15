import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-primary-color  layout ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`${isSidebarOpen ? (i18n.language === 'ar' ? 'mr-[300px]' : 'ml-[300px]') : 'ml-0'}`}>
        <TopNav isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
