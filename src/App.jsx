import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import AIChatPage from './components/AIChatPage';
import BranchDirectoryPage from './components/BranchDirectoryPage';
import MobileFrame from './components/MobileFrame';
import PeoplePage from './components/PeoplePage';
import ProfileDetailPage from './components/ProfileDetailPage';
import RequestDetailPage from './components/RequestDetailPage';
import RequestPage from './components/RequestPage';
import './index.css';

function CloneAppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uiScale, setUiScale] = useState(1);

  const handleScaleChange = (event) => {
    setUiScale(Number(event.target.value));
  };

  const isProfilePage = location.pathname.startsWith('/app/profile');
  const isRequestDetailPage = location.pathname.startsWith('/app/request/');
  const isAIPage = location.pathname === '/app/ai';
  const activeTab = isAIPage
    ? 'ai'
    : isProfilePage
      ? 'people'
      : isRequestDetailPage
        ? 'request'
        : location.pathname === '/app/requests'
          ? 'request'
          : 'people';

  const handleTabChange = (tab) => {
    if (tab === 'people') {
      navigate('/app');
      return;
    }

    if (tab === 'request') {
      navigate('/app/requests');
      return;
    }

    if (tab === 'ai') {
      navigate('/app/ai');
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== 'NAVIGATE_TO_STEP') {
        return;
      }

      const { stepId } = event.data;

      if (stepId === 'people') {
        navigate('/app');
        return;
      }

      if (stepId === 'request') {
        navigate('/app/requests');
        return;
      }

      if (stepId === 'ai') {
        navigate('/app/ai');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080807] px-6 py-12">
      <Link
        className="fixed left-5 top-5 z-[100] rounded-full border border-white/10 bg-black/50 px-4 py-2 font-jakarta text-xs font-semibold uppercase tracking-[0.2em] text-primary-neutral-50 backdrop-blur"
        to="/"
      >
        Branch Directory
      </Link>

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
          <AnimatePresence initial={false} mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route element={<PeoplePage />} index />
              <Route element={<RequestPage />} path="requests" />
              <Route element={<ProfileDetailPage />} path="profile/:id" />
              <Route element={<RequestDetailPage />} path="request/:id" />
              <Route element={<AIChatPage />} path="ai" />
            </Routes>
          </AnimatePresence>
        </MobileFrame>
      </div>
    </div>
  );
}

function LegacyAppRedirect({ prefix }) {
  const params = useParams();
  const target = params.id ? `/app/${prefix}/${params.id}` : `/app/${prefix}`;
  return <Navigate replace to={target} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BranchDirectoryPage />} path="/" />
        <Route element={<CloneAppShell />} path="/app/*" />
        <Route element={<LegacyAppRedirect prefix="requests" />} path="/requests" />
        <Route element={<LegacyAppRedirect prefix="ai" />} path="/ai" />
        <Route element={<LegacyAppRedirect prefix="profile" />} path="/profile/:id" />
        <Route element={<LegacyAppRedirect prefix="request" />} path="/request/:id" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
