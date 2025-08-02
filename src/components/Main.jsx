import { useState, useEffect } from "react";
import { MAX_USERS } from "../constants";
import { fetchUserData } from "../api";
import Legend from "./Legend";
import RatingChart from "./RatingChart";
import DiligenceChart from "./DiligenceChart";
import CumulativeScores from "../utils/CumulativeScores";

const defaultUser = "WatanabeHaruto";

export default function Main() {
    const [inputs, setInputs] = useState([defaultUser]);
    const [userNames, setUserNames] = useState([]);
    const [ratingDatas, setRatingDatas] = useState([]);
    const [processedDataList, setProcessedDataList] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleAddUser = () => {
        if (inputs.length < MAX_USERS) {
            setInputs([...inputs, ""]);
        }
    };

    const loadUserData = async (names) => {
        setErrors([]);

        const ratingPromises = names.map(name =>
            fetchUserData(name, "history")
                .then(data => data.ratingData)
                .catch(() => null)
        );
        const submissionPromises = names.map(name =>
            fetchUserData(name, "submissions")
                .then(data => data.submissionData)
                .catch(() => null)
        );

        const ratings = await Promise.all(ratingPromises);
        const submissions = await Promise.all(submissionPromises);

        const validRatings = ratings.map((r, idx) => r && submissions[idx] ? r : null);
        const validSubmissions = submissions.map((s, idx) => s && ratings[idx] ? s : null);

        const errorMessages = names.map((name, idx) => {
            if (!validRatings[idx] || !validSubmissions[idx]) {
                return `${name} のデータ取得に失敗しました．`;
            }
            return null;
        }).filter(Boolean);

        setErrors(errorMessages);

        const filteredNames = [];
        const filteredRatings = [];
        const filteredSubmissions = [];

        validRatings.forEach((r, idx) => {
            if (r && validSubmissions[idx]) {
                filteredNames.push(names[idx]);
                filteredRatings.push(r);
                filteredSubmissions.push(validSubmissions[idx]);
            }
        });

        setUserNames(filteredNames);
        setRatingDatas(filteredRatings);

        const processedList = filteredRatings.map((rData, idx) =>
            CumulativeScores(rData, filteredSubmissions[idx])
        );
        setProcessedDataList(processedList);
    };

    useEffect(() => {
        loadUserData([defaultUser]);
    }, []);

    useEffect(() => {
        console.log("userNames:", userNames);
    }, [userNames]);

    useEffect(() => {
        console.log("ratingDatas:", ratingDatas);
    }, [ratingDatas]);

    useEffect(() => {
        console.log("diligenceDatas:", processedDataList);
    }, [processedDataList]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNames = inputs.map(name => name.trim()).filter(Boolean);
        await loadUserData(trimmedNames);
    };

    return (
        <main>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                {inputs.map((input, idx) => (
                    <div key={idx} style={{ marginBottom: "0.5rem" }}>
                        <label>
                            AtCoder ID {idx + 1}:
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                placeholder="例: WatanabeHaruto"
                                style={{ marginLeft: "0.5rem" }}
                            />
                        </label>
                    </div>
                ))}

                {inputs.length < MAX_USERS && (
                    <button type="button" onClick={handleAddUser} style={{ marginBottom: "0.5rem" }}>
                        ＋ユーザーを追加
                    </button>
                )}
                <br />
                <button type="submit">表示</button>
            </form>

            {errors.length > 0 && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                    {errors.map((err, idx) => (
                        <div key={idx}>{err}</div>
                    ))}
                </div>
            )}

            <Legend userNames={userNames} />
            <h2>AtCoder レーティング推移</h2>
            <p>x軸：日付　y軸：レーティング</p>
            <RatingChart dataList={ratingDatas} />
            <h2>AtCoder 精進チャート</h2>
            <p>x軸：コンスト出場回数　y軸：累積AC得点数</p>
            <DiligenceChart dataList={processedDataList} />
        </main>
    );
}
