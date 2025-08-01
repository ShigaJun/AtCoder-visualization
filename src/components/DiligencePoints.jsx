export default function DiligencePoints({ data, xScale, yScale, color }) {
    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.round)}
                    cy={yScale(d.cumulativeScore)}
                    r={4}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={1.5}
                />
            ))}
        </g>
    );
}