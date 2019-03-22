import { useEffect, useState } from 'react';

import { ScrapeProvider } from './ScrapeContext';

// Custom Hook!
function useScrapes() {
  // Intial State inside our hook
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: [],
  });
  // fetch function
  async function fetchScrapes() {
    const res = await fetch(`http://localhost:2093/data`);
    const data = await res.json();
    setScrapes(data);
  }
  // didMount/Did Update
  useEffect(() => {
    fetchScrapes();
  }, []);
  return { scrapes, fetchScrapes };
}

export default function Page({ children }) {
  const hookInfo = useScrapes();
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
