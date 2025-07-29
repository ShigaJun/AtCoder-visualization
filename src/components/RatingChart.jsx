import { WIDTH, HEIGHT } from "../constants";
import { useRatingChart } from "./useRatingChart";
import Axis from "./Axis";
import BackgroundBands from "./BackgroundBands";
import RatingLine from "./RatingLine";
import RatingPoints from "./RatingPoints";

export default function RatingChart({ data }) {
    if (!data) return <p>Loading...</p>;
    
    const { xScale, yScale } = useRatingChart(data);

    return (
        <svg width={WIDTH} height={HEIGHT}>
            <BackgroundBands yScale={yScale} />
            <RatingLine data={data} xScale={xScale} yScale={yScale} />
            <RatingPoints data={data} xScale={xScale} yScale={yScale} />
            <Axis xScale={xScale} yScale={yScale} />
        </svg>
    );
}
