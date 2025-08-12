import { scaleLinear, scaleTime, extent } from "d3";
import { MARGIN, WIDTH, HEIGHT } from "../constants";

export function useRatingChart(dataList) {
    const flatData = dataList.flat();

    const yRatings = flatData.map(d => d.NewRating);

    const xMax = Math.max(...dataList.map(data => data.length));

    const yMin = Math.min(...yRatings);
    const yMax = Math.max(...yRatings);

    const xScale = scaleLinear()
        .domain([1, xMax])
        .range([MARGIN.left, WIDTH - MARGIN.right]);

    const yScale = scaleLinear()
        .domain([Math.max(0, yMin - 200), yMax + 200])
        .range([HEIGHT - MARGIN.bottom, MARGIN.top - 19]);

    return { xScale, yScale };
}
