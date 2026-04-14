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
      <div className="w-full max-w-7xl pt-2 md:pt-4">
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
            className="mb-8 md:mb-10 rounded-3xl border border-primary/30 bg-linear-to-r from-primary/12 via-accent/8 to-transparent p-5 md:p-8 shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-2">
              Today&apos;s Best Issue
            </p>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-2 md:mb-3">
                  {todaysBestIssue.issueTitle}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-4">
                  {todaysBestIssue.shortDescription}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold">
                  Beginner Score: {todaysBestIssue.beginnerScore}/10
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`/issue/${todaysBestIssue.id}`, { state: { issue: todaysBestIssue } })
                }
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                Start Contributing
              </button>
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
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20" />
                  <Loader2 className="w-9 h-9 text-primary animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-lg font-semibold text-foreground">
                  Finding beginner-friendly issues...
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Curating the best matches for your selected skills.
                </p>
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
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary border border-border text-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Try {skill}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleShowRecommendedIssues}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
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
