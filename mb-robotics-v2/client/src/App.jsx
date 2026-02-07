import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Game from './pages/Game';
import MeetTheTeam from './pages/MeetTheTeam';
import TeamProfiles from './pages/TeamProfiles';
import YLab from './pages/YLab';
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/team" element={<MeetTheTeam />} />
          <Route path="/team/profiles" element={<TeamProfiles />} />
          <Route path="/ylab" element={<YLab />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/results" element={<Results />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </ToastProvider>
  );
}

export default App;
