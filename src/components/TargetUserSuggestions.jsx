import SuggestionsFilter from "./SuggestionsFilter"

export default function TargetUserSuggestions({ processedDataList, myParticiptions, myLatestRating, myFirstRating }) {
    return(
        <div>
            <SuggestionsFilter myParticiptions={myParticiptions} myLatestRating={myLatestRating} myFirstRating={myFirstRating} />
        </div>
    );
}