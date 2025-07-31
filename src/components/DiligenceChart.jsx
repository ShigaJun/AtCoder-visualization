import { scaleLinear } from "d3";
import { WIDTH, HEIGHT, MARGIN } from "../constants";
import Axis from "./Axis";
import DiligentLine from "./DiligentLine";
import DiligencePoints from "./DiligencePoints";

export default function DiligenceChart({ data }) {
    if (!data) return <p>Loading...</p>;

    const xMax = data.length;
    const yMax = Math.max(...data.map(d => d.cumulativeScore)) + 50;

    const xScale = scaleLinear()
        .domain([1, xMax])
        .range([MARGIN.left, WIDTH - MARGIN.right]);

    const yScale = scaleLinear()
        .domain([0, yMax])
        .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

    return (
        <div>
            <svg width={WIDTH} height={HEIGHT}>
                <Axis xScale={xScale} yScale={yScale} />
                <DiligentLine data={data} xScale={xScale} yScale={yScale} />
                <DiligencePoints data={data} xScale={xScale} yScale={yScale} />
            </svg>
        </div>
    );
}
