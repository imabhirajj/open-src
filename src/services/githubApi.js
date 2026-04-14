export const fetchIssues = async (skill = 'javascript') => {
  try {
    // Basic encoding of the query
    const encodedQuery = encodeURIComponent(`label:"good first issue" language:${skill}`);
    const url = `https://api.github.com/search/issues?q=${encodedQuery}&sort=updated&order=desc`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch issues from GitHub');
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error in fetchIssues:', error);
    throw error;
  }
};
