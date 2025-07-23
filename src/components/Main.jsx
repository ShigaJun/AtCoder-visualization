import { useEffect } from "react";
import { fetchHistory } from "../api";
import RatingChart from "./RatingChart";

export default function Main() {
    const urls = null;
    useEffect(() => {
        fetchHistory("WatanabeHaruto").then((urls) => {
            console.log(urls);
        });
    }, []);

    return (
        <main>
            <p>Hello World!</p>
            <RatingChart />
        </main>
    );
}
