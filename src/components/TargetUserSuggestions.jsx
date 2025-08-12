import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import SuggestionsFilter from "./SuggestionsFilter"

export default function TargetUserSuggestions({ myParticiptions, myLatestRating, myFirstRating }) {
    const filteredUserIds = SuggestionsFilter(myParticiptions, myLatestRating, myFirstRating);
    if (!filteredUserIds) return null;

    return (
        <Box width={200} height={200} sx={{ border: 1, overflow: "scroll" }}>
            {filteredUserIds.map((id, idx) => (
                <ListItemButton key={idx}>{id}</ListItemButton>
            ))}
        </Box>
    );
}