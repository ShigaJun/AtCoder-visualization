import { scaleLinear } from "d3";
import { MARGIN, WIDTH, HEIGHT } from "../constants";

export function useDiligenceChart(dataList) {
    const xMax = Math.max(...dataList.map(data => data.length));
    const yMax =
        Math.max(...dataList.flatMap(data => data.map(d => d.cumulativeScore))) + 50;

    const xScale = scaleLinear()
        .domain([1, xMax])
        .range([MARGIN.left, WIDTH - MARGIN.right]);

    const yScale = scaleLinear()
        .domain([0, yMax])
        .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

    return { xScale, yScale };
}
