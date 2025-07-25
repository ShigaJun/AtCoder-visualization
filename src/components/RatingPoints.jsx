export default function RatingPoints({ data, xScale, yScale }) {
    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(new Date(d.EndTime))}
                    cy={yScale(d.NewRating)}
                    r={4}
                    fill="#000"
                    stroke="#fff"
                    strokeWidth={1.5}
                />
            ))}
        </g>
    );
}