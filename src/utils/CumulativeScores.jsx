export default function CumulativeScores(ratingData, submissionData) {
    if (!ratingData || !submissionData) return [];

    // コンテストごとの { round, contestTime, cumulativePoint } を構築
    const processed = [];

    // すべての AC 提出を抽出
    const acSubmissions = submissionData.filter(
        (s) => s.result === "AC" && typeof s.point === "number"
    );

    let totalPoints = 0;

    ratingData.forEach((contest, index) => {
        const contestTime = new Date(contest.EndTime).getTime() / 1000; // 秒にする

        // このコンテストまでにACした提出のうち，前回コンテスト以降の提出を対象にする
        const prevContestTime = index === 0
            ? 0
            : new Date(ratingData[index - 1].EndTime).getTime() / 1000;

        const pointsThisRound = acSubmissions
            .filter((s) => s.epoch_second > prevContestTime && s.epoch_second <= contestTime)
            .reduce((sum, s) => sum + s.point, 0);

        totalPoints += pointsThisRound;

        processed.push({
            round: index + 1,
            cumulativeScore: totalPoints
        });
    });

    return processed;
}
