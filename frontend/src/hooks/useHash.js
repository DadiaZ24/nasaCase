import { useState, useEffect } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState(window.location.hash || '#overview');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#overview');
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Ensure initial state defaults to overview if empty
    if (!window.location.hash) {
      window.history.replaceState(null, null, '#overview');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return hash;
};
