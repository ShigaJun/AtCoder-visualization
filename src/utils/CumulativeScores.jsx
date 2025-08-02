export default function CumulativeScores(ratingData, submissionData) {
    if (!ratingData || !submissionData) return [];

    // コンテストごとの { round, contestTime, cumulativePoint } を構築
    const processed = [];

    // "abc" から始まる problem_id の AC のみ抽出
    const acSubmissions = submissionData.filter(
        (s) =>
            s.result === "AC" &&
            typeof s.point === "number" &&
            s.problem_id &&
            s.problem_id.startsWith("abc")
    );

    let totalPoints = 0;

    ratingData.forEach((contest, index) => {
        const contestTime = Date.parse(contest.EndTime) / 1000; // 秒にする

        // このコンテストまでにACした提出のうち，前回コンテスト以降の提出を対象にする
        const prevContestTime = index === 0
            ? 0
            : Date.parse(ratingData[index - 1].EndTime) / 1000;

        const pointsThisRound = acSubmissions
            .filter((s) => s.epoch_second > prevContestTime && s.epoch_second <= contestTime)
            .reduce((sum, s) => sum + s.point, 0);

        totalPoints += pointsThisRound;

        processed.push({
            round: index + 1,
            cumulativeScore: totalPoints
        });

        console.log(`Round ${index + 1}`);
        console.log(`Time range: ${prevContestTime} ~ ${contestTime}`);
        console.log(`Points this round: ${pointsThisRound}`);

        console.log("contest.EndTime", contest.EndTime);
        console.log("contestTime", contestTime);
    });

    return processed;
}
