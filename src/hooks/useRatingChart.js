import { scaleLinear, scaleTime, extent } from "d3";
import { MARGIN, WIDTH, HEIGHT } from "../constants";

export function useRatingChart(dataList) {
    const flatData = dataList.flat();

    const xDates = flatData.map(d => new Date(d.EndTime));
    const yRatings = flatData.map(d => d.NewRating);

    const xMin = new Date(Math.min(...xDates));
    const xMax = new Date(Math.max(...xDates));

    const yMin = Math.min(...yRatings);
    const yMax = Math.max(...yRatings);

    const xScale = scaleTime()
        .domain([xMin, xMax])
        .range([MARGIN.left, WIDTH - MARGIN.right]);

    const yScale = scaleLinear()
        .domain([Math.max(0, yMin - 200), yMax + 200])
        .range([HEIGHT - MARGIN.bottom, MARGIN.top - 19]);

    return { xScale, yScale };
}
