import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import IssueDetails from './pages/IssueDetails';
import GitGuide from './pages/GitGuide';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import RouteMeta from './components/RouteMeta';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col textured-void text-white/90 relative overflow-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-orange-500 focus:text-black"
        >
          Skip to main content
        </a>

        {/* Global theme container managed from index.css */}
        
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <RouteMeta />
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/issue/:issueId" element={<IssueDetails />} />
              <Route path="/git-guide" element={<GitGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </div>
    </Router>
  );
}

export default App;
