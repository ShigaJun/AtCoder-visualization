import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import SuggestionsFilter from "./SuggestionsFilter"
import { MAX_USERS } from "../constants";

export default function TargetUserSuggestions({ myParticiptions, myLatestRating, myFirstRating, inputs, setInputs }) {
    const filteredUserIds = SuggestionsFilter(myParticiptions, myLatestRating, myFirstRating);
    if (!filteredUserIds) return null;

    const handleClick = (id) => {
        const newInputs = [...inputs];
        let newIdx = newInputs.length;

        function initInputs(newIdx, id) {
            newInputs[newIdx] = id;
            setInputs(newInputs);
        }

        if (newInputs[inputs.length - 1] == "") {
            newIdx = newInputs.length - 1;
            initInputs(newIdx, id);
        } else if (inputs.length < MAX_USERS) {
            initInputs(newIdx, id);
        }
    };

    return (
        <Box width={200} height={200} sx={{ border: 1, overflow: "scroll" }}>
            {filteredUserIds.map((id, idx) => (
                <ListItemButton key={idx} onClick={() => handleClick(id)}>{id}</ListItemButton>
            ))}
        </Box>
    );
}