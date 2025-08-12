import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import SuggestionsFilter from "./SuggestionsFilter"

export default function TargetUserSuggestions({ myParticiptions, myLatestRating, myFirstRating }) {
    const filteredUserIds = SuggestionsFilter(myParticiptions, myLatestRating, myFirstRating);
    if (!filteredUserIds) return null;

    console.log(filteredUserIds);

    return (
        <Box width={200} heigh={200} sx={{ overflowY: "auto" }}>
            {filteredUserIds.map((id, idx) => (
                <ListItemButton key={idx}>{id}</ListItemButton>
            ))}
        </Box>
    );
}