import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <div>
      <button type="button" onClick={fetchScrapes}>
        Refresh Data
      </button>
      <Chart scrapes={scrapes.twitter} />
      <Chart scrapes={scrapes.instagram} />
      <h2>Twitter:</h2>
      <Table scrapes={scrapes.twitter} />
      <h2>Instagram:</h2>
      <Table scrapes={scrapes.instagram} />
      <ul />
    </div>
  );
}
