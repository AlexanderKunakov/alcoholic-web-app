import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const LoaderUI = () => {
    return (
        <Box sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <CircularProgress/>
        </Box>
    );
};

export default LoaderUI;
