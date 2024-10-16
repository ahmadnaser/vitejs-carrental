import { FaEnvelope, FaPhone } from 'react-icons/fa';
import logo_black from '../assets/images/logo_black.png';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black min-h-screen text-gold font-montserrat flex flex-col items-center justify-cente text-white">
      <header className="flex flex-col items-center justify-center">
        <img
          src={logo_black}
          alt="Mee3ad Logo"
          className="h-18 w-16 md:h-24 md:w-24 animate-bounce mb-4 mt-10"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-base md:text-lg text-center">
          Our commitment to safeguarding your privacy.
        </p>
      </header>

      <div className="flex flex-col items-center justify-center mt-10 w-full md:w-3/4 lg:w-2/3">
        <div className="bg-black border border-gold rounded-lg p-6 text-left text-gold">
          <h2 className="text-xl font-bold mb-4">Mee3ad Privacy Policy</h2>
          <p className="mb-4">
            This Privacy Policy explains how Mee3ad collects, uses, discloses,
            and protects your personal information when you use our application
            and services.
          </p>

          <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
          <p className="mb-4">
            We may collect personal information, such as your name, email
            address, phone number, and other data when you use our services or
            interact with the application. We also collect non-personal
            information like device information, IP address, and usage data to
            enhance user experience.
          </p>

          <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
          <p className="mb-4">
            Your information is used to improve our services, provide customer
            support, and personalize your experience. We may also use your
            information for marketing and communication purposes, provided you
            consent to receiving such communications.
          </p>

          <h3 className="text-lg font-semibold mb-2">3. Data Sharing and Disclosure</h3>
          <p className="mb-4">
            We do not sell or share your personal information with third
            parties, except as required by law or to protect our legal rights.
            We may share your information with trusted partners to help us
            deliver services, provided they comply with this Privacy Policy.
          </p>

          <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
          <p className="mb-4">
            We take appropriate technical and organizational measures to ensure
            the security of your data and protect it against unauthorized access,
            alteration, or deletion. However, no system is completely secure, and
            we cannot guarantee absolute security of your data.
          </p>

          <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal
            information. You can also withdraw your consent to data processing at
            any time. If you wish to exercise any of these rights, please contact
            us using the details provided below.
          </p>

          <h3 className="text-lg font-semibold mb-2">6. Changes to This Policy</h3>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page, and we will notify you of any significant
            changes.
          </p>

          <h3 className="text-lg font-semibold mb-2">7. Contact Us</h3>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <ul className="mb-4">
            <li>Email: <a href="mailto:info@mee3ad.com" className="text-gold underline">info@mee3ad.com</a></li>
            <li>Phone: <a href="tel:1700-180-185" className="text-gold underline">1700-180-185</a></li>
          </ul>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="fixed bottom-10 right-5 md:right-10 flex flex-col items-center space-y-3">
        <span className="text-gold text-sm md:text-base">Contact Us</span>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Email Contact */}
          <a href="mailto:info@mee3ad.com" className="text-gold flex flex-col items-center">
            <FaEnvelope className="text-3xl md:text-4xl hover:scale-110 transition-transform duration-300" />
            <p className="text-xs md:text-sm mt-1">info@mee3ad.com</p>
          </a>
          {/* Phone Contact */}
          <a href="tel:1700-180-185" className="text-gold flex flex-col items-center">
            <FaPhone className="text-3xl md:text-4xl hover:scale-110 transition-transform duration-300" />
            <p className="text-xs md:text-sm mt-1">1700-180-185</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
