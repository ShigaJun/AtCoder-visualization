export default function RatingTooltip({ data, userName }) {
    const contestDate = data.EndTime.split("T")[0];

    return (
        <div>
            <p>{userName}</p>
            <p>{data.ContestName}</p>
            <p>{contestDate}</p>
            <p>レーティング：{data.NewRating}</p>
        </div>
    );
}