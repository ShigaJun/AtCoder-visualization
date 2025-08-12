export default function DiligencePoints({ data, xScale, yScale, color }) {
    console.log("DiligencePoints: ", data);
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