import { line } from "d3";

export default function RatingLine({ data, xScale, yScale, color }) {
    if (!data) return null;

    const filteredData = data
        .map(d => ({
            ...d,
            parsedEndTime: new Date(d.EndTime),
        }))
        .filter(d => d.NewRating != null && !isNaN(d.parsedEndTime));

    if (filteredData.length === 0) return null;

    const lineGenerator = line()
        .x(d => xScale(d.parsedEndTime))
        .y(d => yScale(d.NewRating));

    const pathData = lineGenerator(filteredData);

    return <path d={pathData} fill="none" stroke={color} strokeWidth={2} />;
}
