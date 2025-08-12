import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import SuggestionsFilter from "./SuggestionsFilter"
import { MAX_USERS } from "../constants";

export default function TargetUserSuggestions({ myParticiptions, myLatestRating, myFirstRating, inputs, setInputs }) {
    const filteredUserIds = SuggestionsFilter(myParticiptions, myLatestRating, myFirstRating);
    if (!filteredUserIds) return null;

    const handleClick = (id) => {
        if (inputs.length < MAX_USERS) {
            const newInputs = [...inputs];
            newInputs[inputs.length] = id;
            setInputs(newInputs);
        };
    };

    return (
        <Box width={200} height={200} sx={{ border: 1, overflow: "scroll" }}>
            {filteredUserIds.map((id, idx) => (
                <ListItemButton key={idx} onClick={() => handleClick(id)}>{id}</ListItemButton>
            ))}
        </Box>
    );
}