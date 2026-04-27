/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { GITHUB_REPO_URL } from '../config/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_20px_rgba(247,147,26,0.1)]">
      <nav className="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-[1400px] mx-auto">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-orange-500 font-h1 uppercase tracking-widest hover:text-orange-400 transition-colors">
          <Terminal className="w-7 h-7" />
          OSNav
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-data-mono tracking-widest pb-1 transition-colors ${isActive('/') ? 'text-orange-500 border-b-2 border-orange-500' : 'text-white/60 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className={`font-data-mono tracking-widest pb-1 transition-colors ${isActive('/explore') ? 'text-orange-500 border-b-2 border-orange-500' : 'text-white/60 hover:text-white'}`}
          >
            Explore
          </Link>
          <Link 
            to="/git-guide" 
            className={`font-data-mono tracking-widest pb-1 transition-colors ${isActive('/git-guide') ? 'text-orange-500 border-b-2 border-orange-500' : 'text-white/60 hover:text-white'}`}
          >
            Git Guide
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a 
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="bitcoin-gradient px-6 py-2 rounded-full text-black font-bold uppercase text-xs tracking-widest scale-95 active:scale-90 transition-transform duration-150 orange-glow inline-block"
          >
            Start on GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="pt-2 pb-6 space-y-2 px-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Explore', path: '/explore' },
                { name: 'Git Guide', path: '/git-guide' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl font-data-mono tracking-widest text-sm transition-colors ${
                    isActive(item.path) 
                      ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <a 
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bitcoin-gradient px-6 py-3 rounded-full text-black font-bold uppercase text-xs tracking-widest orange-glow"
                >
                  Start on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
