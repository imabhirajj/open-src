import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, AlertCircle, Loader2 } from 'lucide-react';
import IssueCard from '../components/IssueCard';
import SkillSelector from '../components/SkillSelector';
import SearchComponent from '../components/ui/animated-glowing-search-bar';
import { fetchIssues } from '../services/githubApi';

export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  
  // Use state from Router or Default to empty to trigger default fetching behavior
  const initialState = location.state?.selectedSkills || [];
  const [selectedSkills, setSelectedSkills] = useState(initialState);

  const recommendedSkills = ['JavaScript', 'Python', 'TypeScript'];

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleShowRecommendedIssues = () => {
    setSelectedSkills(recommendedSkills);
  };

  const getDifficulty = (score) => {
    if (score >= 8) return 'easy';
    if (score >= 5) return 'medium';
    return 'hard';
  };

  const getIssueType = (issue) => {
    const title = issue.issueTitle.toLowerCase();
    const issueLabels = (issue.labels || []).map((label) => label.toLowerCase());
    const hasKeyword = (keywords) =>
      keywords.some(
        (word) => title.includes(word) || issueLabels.some((label) => label.includes(word))
      );

    if (hasKeyword(['doc', 'readme', 'documentation'])) return 'documentation';
    if (hasKeyword(['bug', 'fix', 'error', 'issue', 'typo'])) return 'bugfix';
    return 'other';
  };

  const calculateBeginnerScore = (item) => {
    let score = 5;
    const title = (item.title || '').toLowerCase();
    const labels = (item.labels || []).map((label) => (label.name || '').toLowerCase());
    const comments = item.comments || 0;
    const updatedAt = item.updated_at ? new Date(item.updated_at).getTime() : Date.now();
    const daysSinceUpdate = Math.floor((Date.now() - updatedAt) / (1000 * 60 * 60 * 24));

    const hasAnyLabel = (keywords) =>
      keywords.some((word) => labels.some((label) => label.includes(word)));
    const titleHasAny = (keywords) => keywords.some((word) => title.includes(word));

    // Positive beginner signals
    if (hasAnyLabel(['good first issue', 'beginner', 'starter', 'first-timers'])) score += 2;
    if (hasAnyLabel(['documentation', 'docs']) || titleHasAny(['doc', 'readme'])) score += 1;
    if (hasAnyLabel(['help wanted'])) score += 1;
    if (daysSinceUpdate <= 14) score += 1;

    // Complexity/risk signals
    if (comments > 10) score -= 2;
    else if (comments > 4) score -= 1;
    if (titleHasAny(['refactor', 'architecture', 'performance', 'security'])) score -= 1;
    if (titleHasAny(['breaking', 'migration'])) score -= 1;
    if (daysSinceUpdate > 90) score -= 1;

    // Keep score in 1..10
    return Math.max(1, Math.min(10, score));
  };

  useEffect(() => {
    const getIssues = async () => {
      // Determine what to fetch. Default if completely empty skills is handled
      const skillsToFetch = selectedSkills.length > 0 ? selectedSkills : ['JavaScript', 'Python'];
      
      setLoading(true);
      setError(null);
      
      try {
        const fetchPromises = skillsToFetch.map(skill => fetchIssues(skill));
        const allResults = await Promise.all(fetchPromises);
        
        let aggregatedData = allResults.flat();
        
        // Remove exact duplicates explicitly across sets just in case
        const seenIds = new Set();
        aggregatedData = aggregatedData.filter((item) => {
          if (seenIds.has(item.id)) return false;
          seenIds.add(item.id);
          return true;
        });

        // Take top 10 combined issues
        aggregatedData = aggregatedData.slice(0, 10);
        
        // Map GitHub data to what IssueCard expects
        const mappedIssues = aggregatedData.map((item) => {
          const urlParts = item.html_url.split('/');
          const repoName = `${urlParts[3]}/${urlParts[4]}`;
          const shortDescription =
            (item.body || 'No description available for this issue yet.')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 160) + ((item.body || '').trim().length > 160 ? '...' : '');
          
          return {
            id: item.id,
            repoName: repoName,
            issueTitle: item.title,
            shortDescription,
            beginnerScore: calculateBeginnerScore(item),
            labels: (item.labels || []).map((label) => label.name),
            comments: item.comments || 0,
            updatedAt: item.updated_at,
            html_url: item.html_url
          };
        });
        
        setIssues(mappedIssues);
      } catch (err) {
        setError(err.message || 'Failed to load issues');
      } finally {
        setLoading(false);
      }
    };

    getIssues();
  }, [selectedSkills]);

  const displayedIssues = useMemo(() => {
    const filtered = issues.filter((issue) => {
      const matchesDifficulty =
        difficultyFilter === 'all' || getDifficulty(issue.beginnerScore) === difficultyFilter;
      const matchesType = typeFilter === 'all' || getIssueType(issue) === typeFilter;
      return matchesDifficulty && matchesType;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return b.beginnerScore - a.beginnerScore;
    });
  }, [issues, difficultyFilter, typeFilter, sortBy]);

  const todaysBestIssue = useMemo(() => {
    if (!issues.length) return null;

    const qualitySorted = [...issues].sort((a, b) => {
      if (b.beginnerScore !== a.beginnerScore) {
        return b.beginnerScore - a.beginnerScore;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return qualitySorted[0];
  }, [issues]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full pt-2 md:pt-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-12 text-center relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">Discovery Engine</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 md:mb-8">
            Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Open Issues</span>
          </h1>

          <div className="mb-8 relative z-50">
            <SearchComponent />
          </div>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium mb-8">
            Browse through curated open-source issues that match your skills. 
            Pick a card to jumpstart your contribution journey.
          </p>

          <div className="flex justify-center -mt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-bold shadow-sm backdrop-blur-sm">
              🎯 Your goal today: Make your first PR
            </div>
          </div>
        </motion.div>

        {/* Skill Selector */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="w-full flex justify-center mb-8 md:mb-10"
        >
          <div className="w-full max-w-4xl">
            <SkillSelector 
              selectedSkills={selectedSkills} 
              onSkillChange={handleSkillChange} 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-7 md:mb-8 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="ui-select px-3 py-2.5 text-sm"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="ui-select px-3 py-2.5 text-sm"
          >
            <option value="all">All Types</option>
            <option value="documentation">Documentation</option>
            <option value="bugfix">Bug fix</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ui-select px-3 py-2.5 text-sm"
          >
            <option value="score">Score: High to Low</option>
            <option value="latest">Latest Updated</option>
          </select>
        </motion.div>

        {!loading && !error && todaysBestIssue && (
          <div className="mb-14 md:mb-16 w-full max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6 self-start md:self-center">
              ⭐ Best Issue For You Today
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary via-fuchsia-500 to-cyan-400 rounded-4xl blur-md opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative w-full rounded-4xl bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 text-left">
                
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-3 tracking-wide py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase">
                      Recommended
                    </span>
                    <span className="text-cyan-300/90 text-sm font-medium">
                      Perfect for your first contribution
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {todaysBestIssue.issueTitle}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                    {todaysBestIssue.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {todaysBestIssue.labels?.slice(0, 4).map((label) => (
                      <span key={label} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-foreground/80 font-medium whitespace-nowrap">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center md:items-end w-full md:w-auto gap-5 self-center justify-center md:border-l md:border-white/10 md:pl-10 relative z-10">
                   <div className="text-center xl:text-right bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-2xl w-full">
                     <p className="text-4xl font-black text-emerald-400">
                       {todaysBestIssue.beginnerScore}<span className="text-2xl text-emerald-400/50">/10</span>
                     </p>
                     <p className="text-[11px] text-emerald-400/80 font-bold uppercase tracking-widest mt-1">Beginner Score</p>
                   </div>
                   
                   <button
                    type="button"
                    onClick={() =>
                      navigate(`/issue/${todaysBestIssue.id}`, { state: { issue: todaysBestIssue } })
                    }
                    className="w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                  >
                    Start with this issue
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}

        {/* State Management */}
        <div className="min-h-[400px] w-full">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full pb-20"
              >
                <div className="flex flex-col items-center justify-center mb-10 pt-4">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-lg font-medium text-foreground">Loading beginner-friendly issues...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 h-64 animate-pulse flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-1/2 h-6 bg-white/10 rounded-full" />
                      <div className="w-16 h-6 bg-white/10 rounded-full" />
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="w-full h-5 bg-white/10 rounded-md" />
                      <div className="w-4/5 h-5 bg-white/10 rounded-md" />
                      <div className="w-3/5 h-5 bg-white/10 rounded-md" />
                    </div>
                    <div className="flex gap-2 mb-auto">
                      <div className="w-20 h-6 bg-white/10 rounded-full" />
                      <div className="w-24 h-6 bg-white/10 rounded-full" />
                    </div>
                    <div className="pt-4 mt-auto border-t border-white/10">
                      <div className="w-full h-12 bg-white/10 rounded-xl" />
                    </div>
                  </div>
                ))}
                </div>
              </motion.div>
            )}

            {error && !loading && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl my-6 max-w-2xl mx-auto flex items-start gap-4 shadow-2xl backdrop-blur-md"
              >
                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Error Fetching Issues</h3>
                  <p className="text-rose-400/80">{error}</p>
                </div>
              </motion.div>
            )}

            {!loading && !error && displayedIssues.length === 0 && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-14 px-6 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md max-w-3xl mx-auto"
              >
                <Sparkles className="w-12 h-12 text-primary/80 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No issues found for this skill.
                </h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8">
                  Try JavaScript — similar skills
                </p>

                <button
                  type="button"
                  onClick={handleShowRecommendedIssues}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-[0_0_20px_rgba(124,137,255,0.4)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-in-out"
                >
                  Show recommended issues
                </button>
              </motion.div>
            )}

            {!loading && !error && displayedIssues.length > 0 && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pb-20"
              >
                <div className="flex items-center justify-center mb-8">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 shadow-inner backdrop-blur-sm">
                    <span className="text-lg">💡</span>
                    <span className="text-sm font-medium">
                      {selectedSkills.length > 0
                        ? "Based on your skills, we found these beginner-friendly issues for you"
                        : "Here are some beginner-friendly issues to get started"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {displayedIssues.map((issue, index) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={issue.id} 
                      className="block group h-full"
                    >
                      <IssueCard
                        repoName={issue.repoName}
                        issueTitle={issue.issueTitle}
                        beginnerScore={issue.beginnerScore}
                        labels={issue.labels}
                        onStartContributing={() =>
                          navigate(`/issue/${issue.id}`, { state: { issue } })
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
