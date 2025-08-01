export default function RatingPoints({ data, xScale, yScale, color }) {
    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(new Date(d.EndTime))}
                    cy={yScale(d.NewRating)}
                    r={4}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={1.5}
                />
            ))}
        </g>
    );
}