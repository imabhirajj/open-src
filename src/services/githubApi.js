export const fetchIssues = async (skill = 'javascript') => {
  try {
    // Query specifically for easy/beginner-friendly issues
    const encodedQuery = encodeURIComponent(`label:"good first issue" OR label:"beginner" OR label:"first-timers-only" language:${skill} state:open`);
    const url = `https://api.github.com/search/issues?q=${encodedQuery}&sort=updated&order=desc&per_page=30`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch issues from GitHub');
    }
    
    const data = await response.json();
    let issues = data.items || [];
    
    // Calculate score based on specific criteria for beginners
    issues = issues.map(issue => {
      let score = 5; // Base score
      const title = (issue.title || '').toLowerCase();
      const labels = (issue.labels || []).map(label => label.name?.toLowerCase());
      
      // High priority for beginner labels
      if (labels.includes('good first issue')) score += 3;
      if (labels.includes('first-timers-only')) score += 3;
      if (labels.includes('beginner')) score += 2;
      if (labels.includes('easy')) score += 2;
      
      // Documentation is great for beginners
      if (labels.includes('documentation') || labels.includes('docs')) score += 2;
      
      // Small/quick fixes
      if (title.includes('typo') || title.includes('fix') || title.includes('small')) score += 1;
      
      // Fewer comments = easier issue
      if (issue.comments === 0) score += 2;
      else if (issue.comments < 3) score += 1;
      else if (issue.comments > 10) score -= 2; // Many comments might mean complicated
      
      // Penalize complex-sounding titles
      if (title.includes('refactor') || title.includes('architecture') || title.includes('migration')) score -= 2;
      
      return {
        ...issue,
        score
      };
    });
    
    // Sort issues in descending order of score
    issues.sort((a, b) => b.score - a.score);
    
    return issues;
  } catch (error) {
    console.error('Error in fetchIssues:', error);
    throw error;
  }
};
