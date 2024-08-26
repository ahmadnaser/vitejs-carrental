import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { getUserByEmail, updateUserDetails } from '../../controller/UserController'; 
import { updateConfigCode } from '../../controller/CodeController';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("general");
  const navigate = useNavigate();
  const [profileStatus, setProfileStatus] = useState(null);
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [codeStatus, setCodeStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({
    new_name: '',
    new_address: ''
  });
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    rewrite_password: ''
  });
  const [codeData, setCodeData] = useState({
    old_code: '',
    new_code: '',
    rewrite_code: ''
  });

  const fetchUser = async () => {
    const email = localStorage.getItem('email'); 
    if (email) {
      try {
        const fetchedUser = await getUserByEmail(email); 
        setUser(fetchedUser);
        setUserData({
          new_name: fetchedUser.name || '',
          new_address: fetchedUser.address || ''
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrors(prevErrors => ({ ...prevErrors, fetch: 'Failed to load user data' }));
      }
    } else {
      console.error('No email found in local storage');
      setErrors(prevErrors => ({ ...prevErrors, email: 'No email found in local storage' }));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const validateForm = () => {
    const validationErrors = {};
    if (!userData.new_name.trim()) validationErrors.new_name = t('Name is required');
    if (!userData.new_address.trim()) validationErrors.new_address = t('Address is required');

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const validationErrors = {};
    if (!passwordData.old_password.trim()) validationErrors.old_password = t('Old password is required');
    if (!passwordData.new_password.trim()) validationErrors.new_password = t('New password is required');
    if (passwordData.new_password !== passwordData.rewrite_password) validationErrors.rewrite_password = t('Passwords do not match');

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateCodeForm = () => {
    const validationErrors = {};
    if (!codeData.old_code.trim()) validationErrors.old_code = t('Old code is required');
    if (!codeData.new_code.trim()) validationErrors.new_code = t('New code is required');
    if (codeData.new_code !== codeData.rewrite_code) validationErrors.rewrite_code = t('Codes do not match');

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeSection === "password") {
      setPasswordData({ ...passwordData, [name]: value });
    } else if (activeSection === "code") {
      setCodeData({ ...codeData, [name]: value });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setProfileStatus('loading');
    const email = localStorage.getItem('email');
    if (email) {
      try {
        const response = await updateUserDetails(email, userData.new_name, userData.new_address);
        if (response.success) {
          setProfileStatus('success');
          fetchUser(); 
        } else {
          setProfileStatus('error');
          setErrors({ form: response.message || 'An unexpected error occurred' });
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setProfileStatus('error');
        setErrors({ form: 'Failed to update profile' });
      }
    } else {
      setProfileStatus('error');
      setErrors({ form: 'An unexpected error occurred' });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setPasswordStatus('loading');
    const email = localStorage.getItem('email');
    if (email) {
      try {
        const response = await updateUserDetails(email, null, null, passwordData.old_password, passwordData.new_password);
        if (response.success) {
          setPasswordStatus('success');
          setPasswordData({
            old_password: '',
            new_password: '',
            rewrite_password: ''
          });
        } else {
          setPasswordStatus('error');
          setErrors({ form: response.message || 'An unexpected error occurred' });
        }
      } catch (error) {
        console.error('Error updating password:', error);
        setPasswordStatus('error');
        setErrors({ form: 'Failed to update password' });
      }
    } else {
      setPasswordStatus('error');
      setErrors({ form: 'An unexpected error occurred' });
    }
  };

  const handleUpdateCode = async (e) => {
    e.preventDefault();
    if (!validateCodeForm()) return;

    setCodeStatus('loading');
    try {
      const response = await updateConfigCode(codeData.new_code, codeData.old_code);
      if (response.success) {
        setCodeStatus('success');
        setCodeData({
          old_code: '',
          new_code: '',
          rewrite_code: ''
        });
      } else {
        setCodeStatus('error');
        setErrors({ form: response.message || 'An unexpected error occurred' });
      }
    } catch (error) {
      console.error('Error updating code:', error);
      setCodeStatus('error');
      setErrors({ form: 'Failed to update code' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate("/login");
  };

  const handleBlackListButtonClick = () => {
    navigate('/settings/black-list');
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
      <div className={`w-full ${i18n.language === "ar" ? "text-right" : "text-left"} p-10 mt-20 mb-5`}>
        <h1 className="text-3xl font-bold text-secondary-color">
          {t("Settings")}
        </h1>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-x-5 gap-y-4 mb-12 mx-5">
        <button className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${activeSection === "general" ? "bg-[#b7ffe913]" : "bg-transparent"} hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("general")}>{t("General")}</button>
        <button className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${activeSection === "profile" ? "bg-[#b7ffe913]" : "bg-transparent"} hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("profile")}>{t("Profile")}</button>
        <button className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${activeSection === "password" ? "bg-[#b7ffe913]" : "bg-transparent"} hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("password")}>{t("Password")}</button>
        <button className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${activeSection === "code" ? "bg-[#b7ffe913]" : "bg-transparent"} hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("code")}>{t("Admin Code")}</button>
        <button className={`border-none rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 ${activeSection === "notification" ? "bg-[#b7ffe913]" : "bg-transparent"} hover:bg-[#b7ffe913]`}
          onClick={() => setActiveSection("notification")}>{t("Notification")}</button>
      </div>

      <div>
        {activeSection === "general" && (
          <div className="mt-10">
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
              <button className="border-none bg-blue-600 rounded-md text-heading-color text-lg cursor-pointer py-1.5 px-6 hover:bg-[#b7ffe913]"
                onClick={handleBlackListButtonClick}>
                {t("Blacklist")}
              </button>
            </div>

            <div className="flex w-full flex-wrap items-center text-xl justify-center gap-x-5 flex-col gap-y-4 mt-12">
              <div className=" cursor-pointer text-red-500 transition-colors duration-300 hover:text-white mb-10" onClick={handleLogout}>
                <i className="ri-logout-circle-r-line"></i> {t("Logout")}
              </div>
            </div>
          </div>
        )}

        {activeSection === "profile" && (
          <div className="mt-10">
            <div className="bg-white p-3 rounded-lg">
              <h2 className="text-black font-medium mb-1 text-xl">
                {t("Profile")}
              </h2>
              <p className="text-small-text-color mb-8">
                {t("Manage your personal information here.")}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12">
              <form onSubmit={handleUpdateProfile}>
                <div className="flex flex-col gap-y-8 mb-8">
                  <div className="flex flex-col w-full">
                    <label className="text-heading-color mb-1.5 text-sm">
                      {t("Name")}
                    </label>
                    <input
                      type="text"
                      name="new_name"
                      value={userData.new_name} 
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                    />
                    {errors.new_name && <p className="text-red-500">{errors.new_name}</p>}
                  </div>

                  <div className="flex flex-col gap-y-8 mb-8">
                    <div className="flex flex-col w-full">
                      <label className="text-heading-color mb-1.5 text-sm">
                        {t("Address")}
                      </label>
                      <input
                        type="text"
                        name="new_address"
                        value={userData.new_address} 
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                      />
                      {errors.new_address && <p className="text-red-500">{errors.new_address}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-x-4">
                  <button type="submit" className="border-none outline-none bg-transparent text-secondary-color text-md font-bold cursor-pointer">
                    {t("Update")}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-x-4">
                  {profileStatus === 'success' && (
                    <div className="text-green-500">
                      {t('Profile updated successfully!')}
                    </div>
                  )}
                  {profileStatus === 'error' && (
                    <div className="text-red-500">
                      {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {activeSection === "code" && (
          <div className="mt-10">
            <div className="bg-white p-3 rounded-lg">
              <h2 className="text-black font-medium mb-1 text-xl">
                {t("Admin Code")}
              </h2>
              <p className="text-small-text-color mb-8">
                {t("Change your Admin Code here.")}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12">
              <form onSubmit={handleUpdateCode}>
                <div className="flex flex-col gap-y-8 mb-8">
                  <div className="flex flex-col w-full">
                    <label className="text-heading-color mb-1.5 text-sm">
                      {t("Old Code")}
                    </label>
                    <input
                      type="password"
                      name="old_code"
                      value={codeData.old_code}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                    />
                    {errors.old_code && <p className="text-red-500">{errors.old_code}</p>}
                  </div>

                  <div className="flex flex-col gap-y-8 mb-8">
                    <div className="flex flex-col w-full">
                      <label className="text-heading-color mb-1.5 text-sm">
                        {t("New Code")}
                      </label>
                      <input
                        type="password"
                        name="new_code"
                        value={codeData.new_code}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                      />
                      {errors.new_code && <p className="text-red-500">{errors.new_code}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-8 mb-8">
                    <div className="flex flex-col w-full">
                      <label className="text-heading-color mb-1.5 text-sm">
                        {t("Rewrite Code")}
                      </label>
                      <input
                        type="password"
                        name="rewrite_code"
                        value={codeData.rewrite_code}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                      />
                      {errors.rewrite_code && <p className="text-red-500">{errors.rewrite_code}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-4 mb-5">
                  <button type="submit" className="border-none outline-none bg-transparent text-secondary-color text-md font-bold cursor-pointer">
                    {t("Update")}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-x-4 mb-10">
                  {codeStatus === 'success' && (
                    <div className="text-green-500">
                      {t('Admin Code updated successfully!')}
                    </div>
                  )}
                  {codeStatus === 'error' && (
                    <div className="text-red-500">
                      {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {activeSection === "password" && (
          <div className="mt-10">
            <div className="bg-white p-3 rounded-lg">
              <h2 className="text-black font-medium mb-1 text-xl">
                {t("Password")}
              </h2>
              <p className="text-small-text-color mb-8">
                {t("Change your password here.")}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-12">
              <form onSubmit={handleUpdatePassword}>
                <div className="flex flex-col gap-y-8 mb-8">
                  <div className="flex flex-col w-full">
                    <label className="text-heading-color mb-1.5 text-sm">
                      {t("Old Password")}
                    </label>
                    <input
                      type="password"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                    />
                    {errors.old_password && <p className="text-red-500">{errors.old_password}</p>}
                  </div>

                  <div className="flex flex-col gap-y-8 mb-8">
                    <div className="flex flex-col w-full">
                      <label className="text-heading-color mb-1.5 text-sm">
                        {t("New Password")}
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                      />
                      {errors.new_password && <p className="text-red-500">{errors.new_password}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-8 mb-8">
                    <div className="flex flex-col w-full">
                      <label className="text-heading-color mb-1.5 text-sm">
                        {t("Rewrite Password")}
                      </label>
                      <input
                        type="password"
                        name="rewrite_password"
                        value={passwordData.rewrite_password}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-md bg-transparent border border-[#b7ffe913] text-heading-color text-lg focus:outline-none placeholder:text-small-text-color placeholder:text-sm"
                      />
                      {errors.rewrite_password && <p className="text-red-500">{errors.rewrite_password}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-4 mb-5">
                  <button type="submit" className="border-none outline-none bg-transparent text-secondary-color text-md font-bold cursor-pointer">
                    {t("Update")}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-x-4 mb-10">
                  {passwordStatus === 'success' && (
                    <div className="text-green-500">
                      {t('Password updated successfully!')}
                    </div>
                  )}
                  {passwordStatus === 'error' && (
                    <div className="text-red-500">
                      {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

      {activeSection === "notification" && (
                <div className="mt-10">
                  <div className="bg-white p-3 rounded-lg">
                    <h2 className="text-black font-medium mb-1 text-xl">
                      {t("Notification")}
                    </h2>
                    <p className="text-small-text-color mb-8">
                      {t("Manage your Notification here.")}
                    </p>
                  </div>
                </div>
              )}
      </div>
    </div>
  );
};

export default Settings;
