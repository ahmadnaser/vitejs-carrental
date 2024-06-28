import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

function NavigationButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = parseInt(location.pathname.replace('/step', '')) || 1;

  const handleNext = () => {
    if (currentStep < 3) {
      navigate(`/step${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(`/step${currentStep - 1}`);
    }
  };

  return (
    <div>
      <button onClick={handlePrevious} disabled={currentStep === 1}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentStep === 3}>
        Next
      </button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>


      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
      </Routes>
      <NavigationButtons />
    </Router>
  );
}

export default App;
