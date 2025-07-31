import { useMemo } from "react";

export default function useDiligenceChart(submissions, history) {
    return useMemo(() => {
        if (!submissions || !history) return [];

        // contest_idの出場順序をマップにする
        const contestOrderMap = {};
        history.forEach((entry, index) => {
            contestOrderMap[entry.ContestScreenName] = index + 1; // 1-based index
        });

        // 提出をフィルタしてマッピング
        const chartData = submissions
            .filter((sub) => contestOrderMap[sub.contest_id] !== undefined)
            .map((sub) => ({
                contestOrder: contestOrderMap[sub.contest_id],
                point: sub.point,
            }));

        return chartData;
    }, [submissions, history]);
}
