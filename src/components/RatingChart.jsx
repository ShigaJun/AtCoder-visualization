import { useRatingChart } from "../hooks/useRatingChart";
import { WIDTH, HEIGHT, LEGEND_COLORS } from "../constants";
import Axis from "./Axis";
import BackgroundBands from "./BackgroundBands";
import RatingLine from "./RatingLine";
import RatingPoints from "./RatingPoints";

export default function RatingChart({ dataList, userNames }) {
    const { xScale, yScale } = useRatingChart(dataList);

    if (!dataList || dataList.length == 0) {
        return (
            <div>
                <svg width={WIDTH} height={HEIGHT}>
                    <Axis xScale={xScale} yScale={yScale} />
                </svg>
            </div>
        );
    }
    
    return (
        <svg width={WIDTH} height={HEIGHT}>
            <Axis xScale={xScale} yScale={yScale} />
            <BackgroundBands yScale={yScale} />
            {dataList.map((data, idx) => (
                <g key={idx}>
                    <RatingLine
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        color={LEGEND_COLORS[idx % LEGEND_COLORS.length]}
                    />
                    <RatingPoints
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        color={LEGEND_COLORS[idx % LEGEND_COLORS.length]}
                        userName={userNames[idx]}
                    />
                </g>
            ))}
        </svg>
    );

}
