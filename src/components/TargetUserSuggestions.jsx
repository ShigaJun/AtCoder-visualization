import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import SuggestionsFilter from "./SuggestionsFilter"

export default function TargetUserSuggestions({ processedDataList, myParticiptions, myLatestRating, myFirstRating }) {
    const filteredUserIds = SuggestionsFilter(myParticiptions, myLatestRating, myFirstRating);
    console.log(filteredUserIds);
    return(
        <div>
            
        </div>
    );
}