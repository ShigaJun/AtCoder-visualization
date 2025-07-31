export default function DiligencePoints({ data, xScale, yScale }) {
    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.round)}
                    cy={yScale(d.cumulativeScore)}
                    r={4}
                    fill="#000"
                    stroke="#fff"
                    strokeWidth={1.5}
                />
            ))}
        </g>
    );
}