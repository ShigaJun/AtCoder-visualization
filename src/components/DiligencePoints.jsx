import { Tooltip } from "@mui/material";

import DiligenceTooltip from "./DiligenceTooltip";

export default function DiligencePoints({ data, xScale, yScale, color, userName }) {
    return (
        <g>
            {data.map((d, i) => (
                <Tooltip title={<DiligenceTooltip data={data[i]} userName={userName} />} key={i}>
                    <circle
                        key={i}
                        cx={xScale(d.round)}
                        cy={yScale(d.cumulativeScore)}
                        r={4}
                        fill={color}
                        stroke="#fff"
                        strokeWidth={1.5}
                    />
                </Tooltip>
            ))}
        </g>
    );
}