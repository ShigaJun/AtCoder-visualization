import { line } from "d3";

export default function DiligentLine({ data, xScale, yScale }) {
    if (!data) return null;

    const filteredData = data.filter(
        d => d.cumulativeScore != null && !isNaN(d.cumulativeScore)
    );

    if (filteredData.length === 0) return null;

    const lineGenerator = line()
        .x(d => xScale(d.round))
        .y(d => yScale(d.cumulativeScore));

    const pathData = lineGenerator(filteredData);

    return <path d={pathData} fill="none" stroke="#000" strokeWidth={2} />;
}
