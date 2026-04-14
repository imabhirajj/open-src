import { useState, useEffect } from 'react';
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
  
  // Use state from Router or Default to empty to trigger default fetching behavior
  const initialState = location.state?.selectedSkills || [];
  const [selectedSkills, setSelectedSkills] = useState(initialState);

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
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
          
          return {
            id: item.id,
            repoName: repoName,
            issueTitle: item.title,
            beginnerScore: Math.floor(Math.random() * 5) + 6,
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

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-7xl pt-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">Discovery Engine</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-8">
            Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Open Issues</span>
          </h1>

          <div className="mb-8 relative z-50">
            <SearchComponent />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Browse through curated open-source issues that match your skills. 
            Pick a card to jumpstart your contribution journey.
          </p>
        </motion.div>

        {/* Skill Selector */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="w-full flex justify-center mb-12"
        >
          <div className="w-full max-w-4xl">
            <SkillSelector 
              selectedSkills={selectedSkills} 
              onSkillChange={handleSkillChange} 
            />
          </div>
        </motion.div>

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
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-400">Scanning GitHub for best issues...</p>
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

            {!loading && !error && issues.length === 0 && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md max-w-3xl mx-auto"
              >
                <Sparkles className="w-12 h-12 text-slate-500 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">No issues found</h3>
                <p className="text-lg text-slate-400 max-w-md">Try selecting a different skill or language to find matching open source issues.</p>
              </motion.div>
            )}

            {!loading && !error && issues.length > 0 && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20"
              >
                {issues.map((issue, index) => (
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
