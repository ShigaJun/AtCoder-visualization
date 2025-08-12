export default function DiligenceTooltip({ data, userName }) {
    return (
        <div>
            <p>{userName}</p>
            <p>累積AC得点数：{data.cumulativeScore}</p>
        </div>
    );
}