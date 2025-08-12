export default function RatingTooltip({ data }) {
    const contestDate = data.EndTime.split("T")[0];

    return (
        <div>
            <p>{data.ContestName}</p>
            <p>{contestDate}</p>
            <p>レーティング：{data.NewRating}</p>
        </div>
    );
}