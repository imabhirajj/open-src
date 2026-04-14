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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-2xl border-b border-border shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="shrink-0 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Terminal className="w-6 h-6 text-primary-foreground" />
            </div>
            <Link 
              to="/" 
              className="text-xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              OS<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Nav</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Explore', path: '/explore' },
              { name: 'Git Guide', path: '/git-guide' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group"
              >
                <span className={`relative z-10 ${isActive(item.path) ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action button */}
          <div className="hidden md:flex items-center">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="px-5 py-2.5 text-sm font-semibold text-foreground bg-muted border border-border hover:bg-accent hover:text-accent-foreground rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm">
              Start on GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Explore', path: '/explore' },
                { name: 'Git Guide', path: '/git-guide' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex justify-center py-3 text-sm font-semibold text-white bg-white/10 rounded-2xl border border-white/5 active:bg-white/20"
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
