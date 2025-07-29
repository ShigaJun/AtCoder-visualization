import { useState, useEffect } from "react";
import { fetchUserData } from "../api";
import RatingChart from "./RatingChart";

export default function Main() {
    const [ratingData, setRatingData] = useState(null);
    const [submissionData, setSubmissionData] = useState(null);

    useEffect(() => {
        fetchUserData("WatanabeHaruto").then((data) => {
            console.log(data);
            setRatingData(data.ratingData);
            setSubmissionData(data.submissionData);
        });
    }, []);

    return (
        <main>
            <h2>AtCoder レーティング推移</h2>
            <RatingChart data={ratingData} />
        </main>
    );
}
