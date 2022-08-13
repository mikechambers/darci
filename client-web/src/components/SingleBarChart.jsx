import { ResponsiveBar } from "@nivo/bar";
import NivoTooltip from "./NivoTooltip";

const rootStyle = {
  width: "100%",
  height: 50,
};

const SingleBarChart = (props) => {
  const data = props.data;

  let keys = [];

  let d = { d: "d" };

  for (const item of data) {
    d[item.label] = item.value;
    keys.push(item.label);
  }

  return (
    <div id="foo" style={rootStyle}>
      <ResponsiveBar
        data={[d]}
        keys={keys}
        indexBy="d"
        borderRadius={4}
        margin={{ top: 0, right: 12, bottom: 0, left: 12 }}
        minValue={0}
        maxValue={100}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableGridY={false}
        theme={{
          tooltip: {
            container: {
              color: "#333333",
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        isFocusable={true}
        ariaLabel=""
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in FOO: " + e.indexValue;
        }}
        label={function (e) {
          return e.formattedValue + "%";
        }}
        tooltip={(e) => {
          return (
            <NivoTooltip
              label={e.id}
              value={`${e.formattedValue}%`}
              color={e.color}
            />
          );
        }}
      />
    </div>
  );
};

export default SingleBarChart;
