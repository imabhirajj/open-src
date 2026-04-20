export const fetchIssues = async (skill = 'javascript') => {
  try {
    // Basic encoding of the query
    const encodedQuery = encodeURIComponent(`label:"good first issue" language:${skill}`);
    const url = `https://api.github.com/search/issues?q=${encodedQuery}&sort=updated&order=desc&per_page=30`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch issues from GitHub');
    }
    
    const data = await response.json();
    let issues = data.items || [];
    
    // Calculate score based on specific criteria
    issues = issues.map(issue => {
      let score = 0;
      const title = (issue.title || '').toLowerCase();
      const labels = (issue.labels || []).map(label => label.name?.toLowerCase());
      
      if (labels.includes('good first issue')) score += 3;
      if (labels.includes('documentation')) score += 2;
      if (title.includes('typo') || title.includes('fix')) score += 2;
      if (issue.comments < 5) score += 1;
      
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
