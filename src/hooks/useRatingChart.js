import { scaleLinear, scaleTime, extent } from "d3";
import { MARGIN, WIDTH, HEIGHT } from "../constants";

export function useRatingChart(data) {
    const xExtent = extent(data, d => new Date(d.EndTime));
    const yExtent = extent(data, d => d.NewRating);

    const xScale = scaleTime()
        .domain(xExtent)
        .range([MARGIN.left, WIDTH - MARGIN.right]);

    const yScale = scaleLinear()
        .domain([Math.max(0, yExtent[0] - 200), yExtent[1] + 200])
        .range([HEIGHT - MARGIN.bottom, MARGIN.top - 19]);

    console.log(xExtent);
    console.log(typeof xExtent[0], xExtent[0]);

    return { xScale, yScale };
}
