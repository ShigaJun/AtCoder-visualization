import { useState, useEffect } from "react";
import { fetchHistory } from "../api";
import RatingChart from "./RatingChart";

export default function Main() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchHistory("WatanabeHaruto").then((data) => {
            console.log(data);
            setData(data)
        });
    }, []);

    return (
        <main>
            <h2>AtCoder レーティング推移</h2>
            <RatingChart data={data} />
        </main>
    );
}
