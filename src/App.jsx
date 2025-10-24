import { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import PeoplePage from './components/PeoplePage';
import RequestPage from './components/RequestPage';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('people');

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MobileFrame activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'people' ? <PeoplePage /> : <RequestPage />}
      </MobileFrame>
    </div>
  );
}

export default App;
