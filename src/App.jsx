import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import DeleteAccount from './components/DeleteMyAccount';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/delete-my-account" element={<DeleteAccount />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
