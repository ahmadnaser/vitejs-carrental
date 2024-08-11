import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("general");

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div
        className={`w-full ${
          i18n.language === "ar" ? "text-right" : "text-left"
        } p-10 mt-20 mb-5`}
      >
        <h1 className="text-3xl font-bold text-secondary-color">
          {t("Settings")}
        </h1>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-x-5 gap-y-4 mb-12 mx-5">
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "general" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("general")}
        >
          {t("General")}
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "details" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("details")}
        >
          {t("My Details")}
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "profile" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("profile")}
        >
          {t("Profile")}
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "password" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("password")}
        >
          {t("Password")}
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "email" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("email")}
        >
          {t("Email")}
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "code" ? "bg-[#b7ffe913]" : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("code")}
        >
          {t("Admin Code ")} 
        </button>
        <button
          className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${
            activeSection === "notification"
              ? "bg-[#b7ffe913]"
              : "bg-transparent"
          } hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("notification")}
        >
          {t("Notification")}
        </button>
      </div>

      <div>
        {activeSection === "general" && (
          <div className="mt-10 ">
            <div className="bg-white p-3 rounded-lg">
              <h2 className="text-black font-medium mb-1 text-xl">
                {t("General Settings")}
              </h2>
              <p className="text-small-text-color mb-8">
                {t("Manage your general preferences here.")}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12">
              <label className="text-heading-color text-md">
                {t("Select Language")}
              </label>
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="w-full flex-wrap items-center text-xl justify-center rounded-md bg-transparent border border-[#b7ffe913] text-heading-color focus:outline-none"
              >
                <option value="en">{t("English")}</option>
                <option value="ar">{t("Arabic")}</option>
              </select>
             
            </div>

            <div className="flex flex-col gap-y-4 mt-12">
              <button className="border-none bg-blue-600 rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 hover:bg-[#b7ffe913]">
                {t("Blacklist")}
              </button>
            </div>

            <div className="flex w-full flex-wrap items-center text-xl justify-center gap-x-5 flex-col gap-y-4 mt-12">
              <div className=" cursor-pointer text-red-500 transition-colors duration-300 hover:text-white mb-10" onClick={handleLogout}>
                <i className="ri-logout-circle-r-line"></i> Logout
              </div>
            </div>
          </div>
        )}

        {activeSection === "details" && (
          <div>
            <h2 className="text-heading-color font-medium mb-1 text-xl">
              {t("My Details")}
            </h2>
            <p className="text-small-text-color mb-8">
              {t("Update your personal information here.")}
            </p>
          </div>
        )}

        {activeSection === "profile" && (
          <div>
            <h2 className="text-heading-color font-medium mb-1 text-xl">
              {t("Profile")}
            </h2>
            <p className="text-small-text-color mb-8">
              {t("Update your photo and personal details here")}
            </p>
            <form>
              <div className="flex items-center justify-between gap-x-8 mb-8">
                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Live in")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("Sylhet, Bangladesh")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Street")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("SYL 3108")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-8 mb-8">
                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("example@gmail.com")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Phone Number")}
                  </label>
                  <input
                    type="number"
                    placeholder={t("+880 17*******")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-8 mb-8">
                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Date of Birth")}
                  </label>
                  <input
                    type="date"
                    placeholder={t("dd/mm/yyyy")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Gender")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("Male")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-8 mb-8">
                <div className="flex flex-col w-[47%]">
                  <label className="text-heading-color mb-1.5 text-sm">
                    {t("Your Photo")}
                  </label>
                  <p className="text-small-text-color mb-2.5">
                    {t("This will be displayed in your profile")}
                  </p>
                  <input
                    type="file"
                    placeholder={t("choose file")}
                    className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                  />
                </div>

                <div className="flex flex-row gap-x-10">
                  <button className="border-none outline-none bg-transparent text-[#ddd] text-sm cursor-pointer">
                    {t("Delete")}
                  </button>
                  <button className="border-none outline-none bg-transparent text-secondary-color text-sm cursor-pointer">
                    {t("Update")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Add additional sections for Password, Email, and Notification */}
      </div>
    </div>
  );
};

export default Settings;
