function isInLastSixHours(timestamp) {
  const sixHoursAgo = 1000 * 60 * 60 * 6;
  if (Date.now() - timestamp < sixHoursAgo) {
    return true;
  }
  return false;
}

export default function aggregate(scrapes) {
  const aggregateScrapes = [...scrapes]
    .reverse()
    .map(scrape => {
      const date = new Date(scrape.date);
      const optionalHour = isInLastSixHours(scrape.date)
        ? `-${date.getHours()}`
        : ``;
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}${optionalHour}`;
      return {
        key,
        ...scrape,
      };
    })
    .reduce((accumulator, currentScrape) => {
      // if it is NOT found, we want to keep it
      if (!accumulator.find(scrape => scrape.key === currentScrape.key)) {
        return [...accumulator, currentScrape];
      }
      return accumulator;
    }, [])
    .reverse();
  return aggregateScrapes;
}
