import { useEffect, useState } from 'react';

import { RATING_LOWER_BOUND } from "../constants.js"

function ratingToColor(rating) {
    let color = RATING_LOWER_BOUND[0][1];
    for (const [bound, c] of RATING_LOWER_BOUND) {
        if (rating >= bound) {
            color = c;
        } else {
            break;
        }
    }
    return color;
}

export default function SuggestionsFilter({ myParticiptions, myLatestRating, myFirstRating }) {
    const [data, setData] = useState();
    const [results, setResults] = useState();

    useEffect(() => {
        fetch('/data.json')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(json => setData(json));
        fetch("/results.json")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(json => setResults(json));
    }, []);

    if (!data || !results) {
        return null;
    }

    console.log(data);

    const myColor = ratingToColor(myLatestRating);

    // 色の順位マップを作成
    const colorOrder = RATING_LOWER_BOUND.map(([, color]) => color);
    const myIndex = colorOrder.indexOf(myColor);

    // 上位色のIDをまとめる
    const higherUserIds = colorOrder
        .slice(myIndex + 1) // 自分より上の色だけ
        .flatMap(color => data[color] || []); // ユーザーIDを結合

    console.log(higherUserIds);
    return (
        <div>

        </div>
    );
}