import { useDiligenceChart } from "../hooks/useDiligenceChart";
import { WIDTH, HEIGHT, LEGEND_COLORS } from "../constants";
import Axis from "./Axis";
import DiligenceLine from "./DiligenceLine";
import DiligencePoints from "./DiligencePoints";

export default function DiligenceChart({ dataList, userNames }) {
    if (!dataList) return <p>Loading...</p>;

    const { xScale, yScale } = useDiligenceChart(dataList);

    return (
        <div>
            <svg width={WIDTH} height={HEIGHT}>
                <Axis xScale={xScale} yScale={yScale} />
                {dataList.map((data, idx) => (
                    <g key={idx}>
                        <DiligenceLine 
                            data={data}
                            xScale={xScale}
                            yScale={yScale}
                            color={LEGEND_COLORS[idx % LEGEND_COLORS.length]}
                        />
                        <DiligencePoints
                            data={data}
                            xScale={xScale}
                            yScale={yScale}
                            color={LEGEND_COLORS[idx % LEGEND_COLORS.length]}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
