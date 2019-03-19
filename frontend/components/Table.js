import { distanceInWords } from 'date-fns';

export default function Table({ scrapes }) {
  const scrapesReversed = [...scrapes].reverse();
  return (
    <table>
      <thead>
        <tr>
          <td>Count</td>
          <td>Time</td>
        </tr>
      </thead>
      <tbody>
        {scrapesReversed.map(scrape => (
          <tr key={scrape.date}>
            <td>{scrape.count}</td>
            <td>{distanceInWords(new Date(scrape.date), new Date())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
