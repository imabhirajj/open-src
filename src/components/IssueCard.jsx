import { ArrowUpRight, GitPullRequest, ShieldAlert } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function IssueCard({
  repoName,
  issueTitle,
  beginnerScore,
  onStartContributing,
}) {
  // A small helper to color-code the score
  const getScoreVariant = (score) => {
    if (score >= 8) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 5) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#0a0f1d] rounded-3xl shadow-xl border border-white/10 hover:border-indigo-500/50 p-6 flex flex-col justify-between transition-all duration-300 group h-full relative overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 shrink overflow-hidden text-ellipsis max-w-[70%]">
            <GitPullRequest className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <p className="text-xs font-semibold text-slate-300 truncate">
              {repoName}
            </p>
          </div>
          <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border ${getScoreVariant(beginnerScore)}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            Score: {beginnerScore}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white leading-snug mb-8 group-hover:text-indigo-400 transition-colors line-clamp-3">
          {issueTitle}
        </h3>
        
        <div className="mt-auto pt-5 border-t border-white/10 flex gap-3">
          <button
            type="button"
            onClick={onStartContributing}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shrink-0 py-3.5 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
          >
            Start Contributing
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
