import { HEIGHT, WIDTH, MARGIN, COLORS, STEP_SIZE } from "./constants";

export default function BackgroundBands({ yScale }) {
    return (
        <g>
            {COLORS.map(([threshold, color], i) => {
                const y1 = yScale(threshold);
                const y2 = yScale(i + 1 < COLORS.length ? COLORS[i + 1][0] : threshold + STEP_SIZE);
                return (
                    <rect
                        key={i}
                        x={MARGIN.left}
                        y={y2}
                        width={WIDTH - MARGIN.left - MARGIN.right}
                        height={y1 - y2}
                        fill={color}
                        opacity={0.15}
                    />
                );
            })}
        </g>
    );
}