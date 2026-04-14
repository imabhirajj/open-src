import { Link } from 'react-router-dom';
import { Github, Twitter, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">OSNavigator</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering beginner developers to make their first open-source contributions. 
              Find the perfect project tailored to your skills and get started today.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:bg-white/10 hover:border-white/20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-slate-100 font-semibold mb-4 text-sm tracking-widest uppercase">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/explore" className="text-slate-400 text-sm hover:text-primary transition-colors">Explore Issues</Link>
              </li>
              <li>
                <Link to="/git-guide" className="text-slate-400 text-sm hover:text-primary transition-colors">Git & GitHub Guide</Link>
              </li>
              <li>
                <a href="https://docs.github.com/en" target="_blank" rel="noreferrer" className="text-slate-400 text-sm hover:text-primary transition-colors">GitHub Docs</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-slate-100 font-semibold mb-4 text-sm tracking-widest uppercase">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">Discord Server</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">Twitter Updates</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">Submit a Project</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left flex items-center gap-2">
            © {new Date().getFullYear()} Open Source Navigator. Built with <Heart className="w-4 h-4 text-rose-500 inline fill-rose-500" /> for the community.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
