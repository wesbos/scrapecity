import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import NivoChart from './NivoChart';
import GridStyles from './styles/GridStyles';

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <>
      <button type="button" onClick={fetchScrapes}>
        Refresh Data
      </button>
      <GridStyles>
        <NivoChart network="Twitter" scrapes={scrapes.twitter} />
        <NivoChart network="Instagram" scrapes={scrapes.instagram} />
        <Table network="Twitter" scrapes={scrapes.twitter} />
        <Table network="Instagram" scrapes={scrapes.instagram} />
        <ul />
      </GridStyles>
    </>
  );
}
