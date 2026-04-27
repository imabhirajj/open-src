import { Link } from 'react-router-dom';
import { ExternalLink, Rocket, GitBranch, Globe, MessageSquare } from 'lucide-react';
import { GITHUB_REPO_URL, PROJECT_NAME } from '../config/site';

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-black/80 backdrop-blur-3xl border-t border-white/5 pt-16 pb-8 mt-20">
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <Link to="/" className="text-2xl font-black text-white tracking-widest flex items-center gap-2 group w-fit">
              <span className="text-orange-500 font-data-mono">{'>_'}</span>
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-digital-gold transition-all duration-300">
                OSNAV
              </span>
            </Link>
            <p className="text-sm font-medium text-white/40 leading-relaxed font-inter">
              Empowering beginners to make their first open-source contributions. 
              Find beginner-friendly issues, learn the Git workflow, and ship code with confidence.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                <GitBranch className="w-5 h-5" />
              </a>
              <button disabled className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/30 cursor-not-allowed transition-all">
                <Globe className="w-5 h-5" />
              </button>
              <button disabled className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/30 cursor-not-allowed transition-all">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-data-mono">Navigation</h4>
            <Link to="/" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit">Home</Link>
            <Link to="/explore" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit">Explore Issues</Link>
            <Link to="/git-guide" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit">Git Workflow Guide</Link>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-data-mono">Resources</h4>
            <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" target="_blank" rel="noreferrer" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit flex items-center gap-1.5">
              What is a Pull Request? <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://git-scm.com/doc" target="_blank" rel="noreferrer" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit flex items-center gap-1.5">
              Official Git Docs <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://opensource.guide/" target="_blank" rel="noreferrer" className="text-sm text-white/50 hover:text-orange-400 font-medium transition-colors w-fit flex items-center gap-1.5">
              Open Source Guide <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Support Campaign Column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-data-mono">Mission</h4>
            <div className="glass-panel p-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-orange-500/20 transition-all"></div>
              <Rocket className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-sm text-white/80 font-medium tracking-wide">
                Built to help beginners bridge the gap between learning to code and writing production software.
              </p>
            </div>
          </div>
          
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-data-mono text-xs uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} {PROJECT_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-white/40 font-data-mono text-xs uppercase tracking-widest">
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
