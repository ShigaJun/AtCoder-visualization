import { useState } from "react";
import { TextField, Button } from "@mui/material";

import { MAX_USERS } from "../constants";
import TargetUserSuggestions from "./TargetUserSuggestions";

export default function InputId({ inputs, setInputs, loadUserData, userNames, ratingDatas, processedDataList, myParticiptions, myLatestRating, myFirstRating }) {
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
        <div className="field">
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
            <div>
                <strong>あなたの目標になるかもしれないユーザー</strong>
                {ratingDatas[0] ? <TargetUserSuggestions myParticiptions={ratingDatas[0].length} myLatestRating={ratingDatas[0][ratingDatas[0].length - 1].NewRating} myFirstRating={ratingDatas[0][0].NewRating} /> : null}
            </div>
        </div>
    );
}