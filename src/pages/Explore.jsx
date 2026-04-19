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
          
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Browse through curated open-source issues that match your skills. 
            Pick a card to jumpstart your contribution journey.
          </p>
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
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 md:mb-12 rounded-4xl border border-primary/30 bg-linear-to-b from-primary/10 to-transparent p-8 md:p-12 shadow-[0_0_40px_rgba(124,137,255,0.15)] relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 mb-6 shadow-sm">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">⭐ Best for You</span>
            </div>
            
            <div className="relative z-10 max-w-3xl flex flex-col items-center">
              <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                {todaysBestIssue.issueTitle}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                {todaysBestIssue.shortDescription}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Beginner Score: {todaysBestIssue.beginnerScore}/10
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/issue/${todaysBestIssue.id}`, { state: { issue: todaysBestIssue } })
                  }
                  className="inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-base font-bold bg-linear-to-r from-primary to-accent text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-[0_0_25px_rgba(124,137,255,0.45)] hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 ease-in-out"
                >
                  Start Contributing
                </button>
              </div>
            </div>
          </motion.section>
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20"
              >
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
                  No matching issues yet, and that is okay.
                </h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-6">
                  Sometimes a selected skill has fewer open beginner issues right now. Try one of these popular options to discover active beginner-friendly tasks.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {recommendedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setSelectedSkills([skill])}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary border border-border text-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 ease-in-out"
                    >
                      Try {skill}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleShowRecommendedIssues}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-[0_0_20px_rgba(124,137,255,0.4)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-in-out"
                >
                  Show Recommended Issues
                </button>
              </motion.div>
            )}

            {!loading && !error && displayedIssues.length > 0 && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
