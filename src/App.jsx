import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
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
    <div className="flex items-center justify-center max-h-screen bg-black">
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
