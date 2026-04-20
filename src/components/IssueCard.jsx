import { ArrowUpRight, GitPullRequest, ShieldAlert, Sparkles, Lightbulb, Zap, FileText, Bug, Rocket } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function IssueCard({
  repoName,
  issueTitle,
  beginnerScore,
  labels = [],
  onStartContributing,
}) {
  const getIssueType = () => {
    const normalizedTitle = issueTitle.toLowerCase();
    const normalizedLabels = labels.map((label) => label.toLowerCase());
    const hasKeyword = (keywords) =>
      keywords.some(
        (word) =>
          normalizedTitle.includes(word) ||
          normalizedLabels.some((label) => label.includes(word))
      );

    if (hasKeyword(['doc', 'readme', 'documentation', 'docs'])) {
      return { type: 'Documentation', style: 'text-violet-300 bg-violet-500/10 border-violet-400/30' };
    }
    if (hasKeyword(['bug', 'fix', 'error', 'typo', 'broken', 'issue'])) {
      return { type: 'Bug Fix', style: 'text-rose-300 bg-rose-500/10 border-rose-400/30' };
    }
    if (hasKeyword(['feature', 'enhancement', 'add', 'new', 'implement'])) {
      return { type: 'Feature', style: 'text-cyan-300 bg-cyan-500/10 border-cyan-400/30' };
    }
    return null;
  };

  const issueType = getIssueType();

  // A small helper to color-code the score
  const getScoreVariant = (score) => {
    if (score >= 8) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 5) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getDifficultyLabel = (score) => {
    if (score >= 8) return 'Easy';
    if (score >= 5) return 'Medium';
    return 'Hard';
  };

  const getHelperTextInfo = (score) => {
    if (score >= 8) return { text: "Recommended for your first contribution", icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> };
    if (score >= 5) return { text: "Takes less than 20 minutes", icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> };
    return { text: "For experienced contributors", icon: <Zap className="w-3.5 h-3.5 text-rose-400" /> };
  };

  const getIssueTags = () => {
    const normalizedTitle = issueTitle.toLowerCase();
    const normalizedLabels = labels.map((label) => label.toLowerCase());
    const hasKeyword = (keywords) =>
      keywords.some(
        (word) =>
          normalizedTitle.includes(word) ||
          normalizedLabels.some((label) => label.includes(word))
      );

    const tags = [];

    if (
      beginnerScore >= 8 ||
      hasKeyword(['good first issue', 'first timer', 'starter', 'beginner'])
    ) {
      tags.push('Recommended');
    }

    if (hasKeyword(['quick', 'small', 'minor', 'typo', 'easy fix', 'bug'])) {
      tags.push('Quick Fix');
    }

    if (hasKeyword(['doc', 'readme', 'documentation'])) {
      tags.push('Documentation');
    }

    // Keep cards consistent: always show at least one confidence-building tag.
    if (tags.length === 0) {
      tags.push('Recommended');
    }

    return tags.slice(0, 3);
  };

  const getTagStyle = (tag) => {
    if (tag === 'Recommended') {
      return 'text-sky-300 bg-sky-500/10 border-sky-400/30';
    }
    if (tag === 'Quick Fix') {
      return 'text-amber-300 bg-amber-500/10 border-amber-400/30';
    }
    if (tag === 'Documentation') {
      return 'text-violet-300 bg-violet-500/10 border-violet-400/30';
    }
    return 'text-slate-200 bg-white/5 border-white/15';
  };

  const issueTags = getIssueTags();

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-[#0a0f1d] rounded-3xl shadow-xl border border-white/10 hover:border-primary/50 hover:shadow-[0_15px_40px_-10px_rgba(124,137,255,0.25)] p-6 md:p-8 flex flex-col justify-between transition-all duration-200 ease-in-out group h-full relative overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-[60px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6 gap-3">
          <div className="flex flex-wrap items-center gap-2 max-w-[68%]">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 shrink overflow-hidden text-ellipsis">
              <GitPullRequest className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <p className="text-xs font-semibold text-slate-300 truncate">
                {repoName}
              </p>
            </div>
            <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${getScoreVariant(beginnerScore)}`}>
              {getDifficultyLabel(beginnerScore)}
            </span>
            {issueType && (
              <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${issueType.style}`}>
                {issueType.type}
              </span>
            )}
          </div>
          <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border ${getScoreVariant(beginnerScore)}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            Score: {beginnerScore}
          </div>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
          {issueTitle}
        </h3>

        <div className="flex items-center flex-wrap gap-2.5 mb-5 text-sm text-slate-400">
          <span className={`font-semibold ${beginnerScore >= 8 ? 'text-emerald-400' : beginnerScore >= 5 ? 'text-amber-400' : 'text-rose-400'}`}>
            {beginnerScore >= 8 ? 'Easy' : beginnerScore >= 5 ? 'Medium' : 'Hard'}
          </span>
          <span className="opacity-40">•</span>
          <span>{beginnerScore >= 8 ? '~10–20 mins' : beginnerScore >= 5 ? '~30–60 mins' : '1+ hours'}</span>
          <span className="opacity-40">•</span>
          <span className="text-slate-300">Good for your first PR</span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {issueTags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all duration-200 ease-in-out group-hover:scale-[1.03] ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex flex-col gap-5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            {getHelperTextInfo(beginnerScore).icon}
            {getHelperTextInfo(beginnerScore).text}
          </div>
          <div className="pt-5 border-t border-white/10 flex gap-3">
            <button
              type="button"
              onClick={onStartContributing}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm md:text-base font-bold shrink-0 py-3.5 px-4 rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg shadow-primary/25 hover:shadow-[0_0_25px_rgba(124,137,255,0.45)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start Contributing
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
