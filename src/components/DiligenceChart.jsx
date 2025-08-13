import { Box, CircularProgress } from "@mui/material";

import { useDiligenceChart } from "../hooks/useDiligenceChart";
import { WIDTH, HEIGHT, LEGEND_COLORS } from "../constants";
import Axis from "./Axis";
import DiligenceLine from "./DiligenceLine";
import DiligencePoints from "./DiligencePoints";

export default function DiligenceChart({ dataList, isLoading, userNames }) {
    if (!dataList || dataList.length == 0 || isLoading) {
        return (
            <Box
                width={WIDTH}
                height={HEIGHT}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <p>Loading...</p>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    const { xScale, yScale } = useDiligenceChart(dataList);

    return (
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
                        userName={userNames[idx]}
                    />
                </g>
            ))}
        </svg>
    );
}
