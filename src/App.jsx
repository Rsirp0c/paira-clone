import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import MobileFrame from './components/MobileFrame';
import PeoplePage from './components/PeoplePage';
import RequestPage from './components/RequestPage';
import ProfileDetailPage from './components/ProfileDetailPage';
import RequestDetailPage from './components/RequestDetailPage';
import AIChatPage from './components/AIChatPage';
import './index.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uiScale, setUiScale] = useState(1);
  const handleScaleChange = (event) => {
    setUiScale(Number(event.target.value));
  };

  // Determine active tab based on route
  const isProfilePage = location.pathname.startsWith('/profile');
  const isRequestDetailPage = location.pathname.startsWith('/request/');
  const isAIPage = location.pathname === '/ai';
  const activeTab = isAIPage ? 'ai' : (isProfilePage ? 'people' : (isRequestDetailPage ? 'request' : (location.pathname === '/requests' ? 'request' : 'people')));

  const handleTabChange = (tab) => {
    if (tab === 'people') {
      navigate('/');
    } else if (tab === 'request') {
      navigate('/requests');
    } else if (tab === 'ai') {
      navigate('/ai');
    }
  };

  // Listen for navigation messages from parent window
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'NAVIGATE_TO_STEP') {
        const { stepId } = event.data;

        switch(stepId) {
          case 'people':
            navigate('/');
            break;
          case 'request':
            navigate('/requests');
            break;
          case 'ai':
            navigate('/ai');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black">
      <div className="fixed right-5 top-1/2 z-[100] -translate-y-1/2 rounded-xl border border-primary-neutral-900 bg-[rgba(16,16,15,0.9)] p-3 backdrop-blur-sm">
        <p className="mb-2 text-center font-jakarta text-xs text-primary-neutral-300">UI Scale</p>
        <div className="flex h-32 items-center justify-center">
          <input
            aria-label="Scale UI"
            className="w-24 -rotate-90 cursor-pointer accent-primary-blue-500"
            max="1.5"
            min="0.5"
            onChange={handleScaleChange}
            onInput={handleScaleChange}
            step="0.05"
            type="range"
            value={uiScale}
          />
        </div>
        <p className="mt-2 text-center font-jakarta text-xs text-primary-neutral-50">
          {Math.round(uiScale * 100)}%
        </p>
      </div>

      <div className="origin-center transition-transform duration-150" style={{ transform: `scale(${uiScale})` }}>
        <MobileFrame activeTab={activeTab} onTabChange={handleTabChange}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PeoplePage />} />
              <Route path="/requests" element={<RequestPage />} />
              <Route path="/profile/:id" element={<ProfileDetailPage />} />
              <Route path="/request/:id" element={<RequestDetailPage />} />
              <Route path="/ai" element={<AIChatPage />} />
            </Routes>
          </AnimatePresence>
        </MobileFrame>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
