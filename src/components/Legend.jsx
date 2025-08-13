import { Box } from '@mui/material';

import { LEGEND_COLORS } from "../constants";

export default function Legend({ userNames }) {
    return (
        <Box>
            <div style={{ textAlign: "left" }}>
                <strong>凡例:</strong>
                <ul>
                    {userNames.map((name, idx) => (
                        <li key={idx} style={{ color: LEGEND_COLORS[idx % LEGEND_COLORS.length] }}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
}