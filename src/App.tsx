import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AgentsPage from './pages/AgentsPage';
import AgentProfile from './pages/AgentProfile';
import BackPage from './pages/BackPage';
import FavoritesPage from './pages/FavoritesPage';
import Header from './components/Header';
import MessengerOverlay from './components/MessengerOverlay';
import { useGlobalStore } from './store/globalStore';
import { useLocation } from 'react-router-dom';

function App() {
  const { hasVisitedAgents } = useGlobalStore();
  const location = useLocation();
  const showChat = hasVisitedAgents && location.pathname !== '/';

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/backpage" element={<BackPage />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
      </Routes>
      {showChat && <MessengerOverlay />}
    </>
  );
}

export default App;