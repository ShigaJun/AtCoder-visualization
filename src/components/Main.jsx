import { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";

import { MAX_USERS } from "../constants";
import { fetchUserData } from "../api";
import Legend from "./Legend";
import RatingChart from "./RatingChart";
import DiligenceChart from "./DiligenceChart";
import CumulativeScores from "../utils/CumulativeScores";
import Loading from "./Loading";

const defaultUser = "WatanabeHaruto";

export default function Main() {
    const [inputs, setInputs] = useState([defaultUser]);
    const [userNames, setUserNames] = useState([]);
    const [ratingDatas, setRatingDatas] = useState([]);
    const [processedDataList, setProcessedDataList] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNames = inputs.map(name => name.trim()).filter(Boolean);
        setLoading(true);
        await loadUserData(trimmedNames);
        setLoading(false);
    };

    const checkError = (idx) => {
        if (!ratingDatas[idx] && !processedDataList[idx]) {
            return false;
        }
        return ratingDatas[idx].length === 0 && processedDataList[idx].length === 0;
    }

    return (
        <main>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                {inputs.map((input, idx) => (
                    <div key={idx} style={{ marginBottom: "0.5rem" }}>
                        <label>
                            <TextField
                                error={checkError(idx)}
                                id="outlined-basic"
                                value={input}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                label={`AtCoder ID ${idx + 1}`}
                                variant="outlined"
                                helperText={checkError(idx) ? `${userNames[idx]}のデータ取得に失敗しました．` : ""}
                            />
                        </label>
                    </div>
                ))}

                {inputs.length < MAX_USERS && (
                    <Button variant="outlined" type="button" onClick={handleAddUser} style={{ marginBottom: "0.5rem" }}>
                        ＋ユーザーを追加
                    </Button>
                )}
                <br />
                <Button variant="contained" type="submit" loading={loading}>表示</Button>
            </form>

            <Legend userNames={userNames} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                AtCoder レーティング推移
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                x軸：日付　y軸：レーティング
                            </Typography>
                            <RatingChart dataList={ratingDatas} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                AtCoder 精進チャート
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                x軸：コンスト出場回数　y軸：累積AC得点数
                            </Typography>
                            <DiligenceChart dataList={processedDataList} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
}
