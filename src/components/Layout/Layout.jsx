import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`${isSidebarOpen ? 'ml-[300px]' : 'ml-0'}`}>
        <TopNav isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
