import { FaEnvelope, FaPhone } from 'react-icons/fa';
import logo_black from '../assets/images/logo_black.png';

const TermsAndConditions = () => {
  return (
    <div className="bg-black min-h-screen text-gold font-montserrat flex flex-col items-center justify-center text-white">
      <header className="flex flex-col items-center justify-center">
        <img
          src={logo_black}
          alt="Mee3ad Logo"
          className="h-18 w-16 md:h-24 md:w-24 animate-bounce mb-4 mt-10"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Terms and Conditions
        </h1>
        <p className="text-base md:text-lg text-center">
          These terms govern your use of our services.
        </p>
      </header>

      <div className="flex flex-col items-center justify-center mt-10 w-full md:w-3/4 lg:w-2/3">
        <div className="bg-black border border-gold rounded-lg p-6 text-left text-gold">
          <h2 className="text-xl font-bold mb-4">Mee3ad Terms and Conditions</h2>
          <p className="mb-4">
            These Terms and Conditions are a legal agreement between you User and Mee3ad and govern your use of our application, website, and services.
          </p>

          <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
          <p className="mb-4">
            By accessing or using our application or services, you agree to be bound by these Terms. If you do not agree, you must discontinue use of the application immediately.
          </p>

          <h3 className="text-lg font-semibold mb-2">2. Use of the Application</h3>
          <p className="mb-4">
            You may use the application for lawful purposes only. You agree not to use the application for any illegal or unauthorized purpose, including violating any intellectual property or privacy laws.
          </p>

          <h3 className="text-lg font-semibold mb-2">3. User Account</h3>
          <p className="mb-4">
            To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>

          <h3 className="text-lg font-semibold mb-2">4. Intellectual Property</h3>
          <p className="mb-4">
            All content, trademarks, and data provided by Mee3ad, including but not limited to text, images, graphics, and logos, are the property of the Company and are protected by applicable intellectual property laws.
          </p>

          <h3 className="text-lg font-semibold mb-2">5. Limitation of Liability</h3>
          <p className="mb-4">
            Mee3ad shall not be held liable for any damages, whether direct, indirect, incidental, or consequential, arising out of your use of the application. Your use of the application is at your own risk.
          </p>

          <h3 className="text-lg font-semibold mb-2">6. Termination</h3>
          <p className="mb-4">
            We may terminate or suspend your access to the application at any time without notice or liability if you breach these Terms or for any other reason.
          </p>

          <h3 className="text-lg font-semibold mb-2">7. Governing Law</h3>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Mee3ad operates, without regard to its conflict of law provisions.
          </p>

          <h3 className="text-lg font-semibold mb-2">8. Changes to These Terms</h3>
          <p className="mb-4">
            We may revise these Terms from time to time. Any changes will be posted on this page, and by continuing to use the application, you agree to be bound by the revised Terms.
          </p>

          <h3 className="text-lg font-semibold mb-2">9. Contact Us</h3>
          <p className="mb-4">
            If you have any questions about these Terms or need further assistance, please contact us at:
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

export default TermsAndConditions;
