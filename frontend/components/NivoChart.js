import { ResponsiveLine } from '@nivo/line';
import { distanceInWordsStrict } from 'date-fns';

export default function NivoChart({ scrapes, network }) {
  const scrapesWithDates = scrapes.map(scrape => ({
    // x: distanceInWordsStrict(new Date(scrape.date), new Date()),
    x: scrape.key,
    y: scrape.count,
  }));
  console.log(scrapesWithDates);
  if (!scrapes.length) return <p>Loading...</p>;
  return (
    <div style={{ height: 300 }} className="chart">
      <ResponsiveLine
        data={[
          {
            id: network,
            data: scrapesWithDates,
          },
        ]}
        margin={{
          top: 50,
          right: 110,
          bottom: 50,
          left: 60,
        }}
        yScale={{
          type: `linear`,
          stacked: false,
          min: `auto`,
          max: `auto`,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: `bottom`,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `Time Ago`,
          legendOffset: 36,
          legendPosition: `middle`,
        }}
        axisLeft={{
          orient: `left`,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `count`,
          legendOffset: -40,
          legendPosition: `middle`,
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel
        dotLabel="y"
        dotLabelYOffset={-12}
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            anchor: `bottom-right`,
            direction: `column`,
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: `left-to-right`,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: `circle`,
            symbolBorderColor: `rgba(0, 0, 0, .5)`,
            effects: [
              {
                on: `hover`,
                style: {
                  itemBackground: `rgba(0, 0, 0, .03)`,
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
