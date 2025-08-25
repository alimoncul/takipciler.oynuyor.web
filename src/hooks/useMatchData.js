import { useState, useEffect } from 'react';

export function useMatchData() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all JSON files in the current directory
      const matchFiles = await fetchMatchFiles();
      const matchData = [];

      for (const fileName of matchFiles) {
        try {
          const response = await fetch(`./${fileName}`);
          if (response.ok) {
            const data = await response.json();
            matchData.push({
              fileName,
              ...data
            });
          }
        } catch (err) {
          console.warn(`Failed to load match file: ${fileName}`, err);
        }
      }

      // Sort by timestamp (newest first)
      matchData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMatches(matchData);
    } catch (err) {
      setError('Failed to load match data');
      console.error('Error loading matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchFiles = async () => {
    // Since we can't directly list directory contents in the browser,
    // we'll try to load known pattern files or use a manifest
    // For now, let's try the existing file pattern
    const files = [];

    // Try to load the existing file we know about from matches folder
    let i = 1;
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 3; // Stop after 3 consecutive failures
    
    while (consecutiveFailures < maxConsecutiveFailures) {
      try {
        const response = await fetch(`./matches/match${i}.json`);
        if (response.ok) {
          const text = await response.text();
          try {
            // Try to parse as JSON - if it fails, it's probably a 404 page
            JSON.parse(text);
            files.push(`matches/match${i}.json`);
            consecutiveFailures = 0; // Reset failure count on success
          } catch (jsonErr) {
            // Response was 200 but not valid JSON (probably 404 page)
            consecutiveFailures++;
          }
        } else {
          consecutiveFailures++;
        }
      } catch (err) {
        consecutiveFailures++;
      }
      i++;
    }

    // In a real implementation, you might want to:
    // 1. Have a manifest.json file listing all match files
    // 2. Use a backend endpoint to list files
    // 3. Use build-time generation to create a file list

    return files;
  };

  const getMatchesByDate = (date) => {
    if (!date) return matches;

    return matches.filter(match => {
      const matchDate = new Date(match.timestamp).toDateString();
      const filterDate = new Date(date).toDateString();
      return matchDate === filterDate;
    });
  };

  const getAvailableDates = () => {
    const dates = matches.map(match => {
      const date = new Date(match.timestamp);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    });

    return [...new Set(dates)].sort().reverse();
  };

  return {
    matches,
    loading,
    error,
    getMatchesByDate,
    getAvailableDates,
    refetch: loadMatches
  };
}