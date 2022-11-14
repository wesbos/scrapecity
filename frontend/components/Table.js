import { distanceInWords } from 'date-fns';

export default function Table({ scrapes, network }) {
  return (
    <div>
      <h2>{network}</h2>
      <table>
        <thead>
          <tr>
            <td>Count</td>
            <td>Time</td>
            <td>Diff + / -</td>
          </tr>
        </thead>
        <tbody>
          {scrapes.map((scrape, i) => {
            const diff = i > 0 ? scrape.count - scrapes[i - 1].count : 0;
            return (
              <tr key={scrape.date}>
                <td>{scrape.count}</td>
                <td>{distanceInWords(new Date(scrape.date), new Date())}</td>
                <td>
                  {diff > 0 && `+`}
                  {diff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
