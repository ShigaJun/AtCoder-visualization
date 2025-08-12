import { Tooltip } from "@mui/material";

import RatingTooltip from "./RatingTooltip";

export default function RatingPoints({ data, xScale, yScale, color, userName }) {
    return (
        <g>
            {data.map((d, i) => (
                <Tooltip title={<RatingTooltip data={data[i]} userName={userName} />} key={i}>
                    <circle
                        cx={xScale(i + 1)}
                        cy={yScale(d.NewRating)}
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