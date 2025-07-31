import { useState, useEffect } from "react";
import { fetchUserData } from "../api";
import RatingChart from "./RatingChart";
import DiligenceChart from "./DiligenceChart";
import CumulativeScores from "../utils/CumulativeScores";

export default function Main() {
    const [userName, setUserName] = useState("WatanabeHaruto");
    const [inputName, setInputName] = useState("");
    const [ratingData, setRatingData] = useState(null);
    const [submissionData, setSubmissionData] = useState(null);

    useEffect(() => {
        fetchUserData(userName, "history").then((data) => {
            setRatingData(data.ratingData);
        });

        fetchUserData(userName, "submissions").then((data) => {
            setSubmissionData(data.submissionData);
        });
    }, [userName]);

    console.log(ratingData);
    console.log(submissionData);

    const processedData = CumulativeScores(ratingData, submissionData);
    console.log("processedData", processedData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputName.trim()) return;
        setUserName(inputName.trim());
    };

    return (
        <main>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <label>
                    AtCoder ID:
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="例: WatanabeHaruto"
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <button type="submit" style={{ marginLeft: "0.5rem" }}>表示</button>
            </form>

            {ratingData && (
                <>
                    <h2>AtCoder レーティング推移</h2>
                    <RatingChart data={ratingData} />
                </>
            )}

            {processedData && (
                <>
                    <h2>AtCoder 精進チャート</h2>
                    <DiligenceChart data={processedData} />
                </>
            )}
        </main>
    );
}
