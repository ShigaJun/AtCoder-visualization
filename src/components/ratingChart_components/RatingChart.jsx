import React from 'react';

// 日付文字列 → YYYY-MM-DD 形式に変換
const formatDate = iso => {
    return new Date(iso).toISOString().split('T')[0];
};

export default function RatingChart({ data }) {
    if (data == null) {
        return <p>Loading...</p>;
    }

    const width = 600;
    const height = 600;

    // NewRating配列，EndTime配列
    const ratings = data.map(d => d.NewRating);
    const dates = data.map(d => formatDate(d.EndTime));

    const maxRating = Math.max(...ratings);
    const minRating = Math.min(...ratings);

    const padding = 40;
    const innerWidth = width - 2 * padding;
    const innerHeight = height - 2 * padding;
    const xStep = innerWidth / (ratings.length - 1 || 1);
    const yScale = innerHeight / (maxRating - minRating || 1);

    // 折れ線座標
    const points = ratings.map((r, i) => {
        const x = padding + i * xStep;
        const y = height - padding - (r - minRating) * yScale;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
            {/* 折れ線 */}
            <polyline
                fill="none"
                stroke="blue"
                strokeWidth="2"
                points={points}
            />

            {/* 点 */}
            {ratings.map((r, i) => {
                const x = padding + i * xStep;
                const y = height - padding - (r - minRating) * yScale;
                return <circle key={i} cx={x} cy={y} r="3" fill="red" />;
            })}

            {/* x軸ラベル（日付） */}
            {dates.map((date, i) => {
                const x = padding + i * xStep;
                const y = height - padding + 15;
                return (
                    <text
                        key={i}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        fontSize="10"
                        transform={`rotate(45 ${x},${y})`}
                    >
                        {date}
                    </text>
                );
            })}

            {/* y軸ラベル（目盛り） */}
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                const yRating = minRating + (maxRating - minRating) * t;
                const y = height - padding - (yRating - minRating) * yScale;
                return (
                    <text
                        key={i}
                        x={padding - 10}
                        y={y + 4}
                        fontSize="10"
                        textAnchor="end"
                    >
                        {Math.round(yRating)}
                    </text>
                );
            })}
        </svg>
    );
};