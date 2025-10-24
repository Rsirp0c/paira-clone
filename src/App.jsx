import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MobileFrame from './components/MobileFrame';
import PeoplePage from './components/PeoplePage';
import RequestPage from './components/RequestPage';
import ProfileDetailPage from './components/ProfileDetailPage';
import './index.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on route
  const isProfilePage = location.pathname.startsWith('/profile');
  const activeTab = isProfilePage ? 'people' : (location.pathname === '/requests' ? 'request' : 'people');

  const handleTabChange = (tab) => {
    if (tab === 'people') {
      navigate('/');
    } else if (tab === 'request') {
      navigate('/requests');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MobileFrame activeTab={activeTab} onTabChange={handleTabChange}>
        <Routes>
          <Route path="/" element={<PeoplePage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
        </Routes>
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
