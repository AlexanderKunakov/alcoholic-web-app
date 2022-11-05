import React from 'react';
import AlertUI from "./AlertUI";
import {Stack} from "@mui/material";
import {useAppSelector} from "../../../store/hook/Redux";

const AlertsStackUI = () => {
    const {errorsList} = useAppSelector(state => state.errorsReducer);

    return (
        <Stack sx={{position: "absolute", left: "3rem", bottom: "2rem"}} spacing={2}>
            {errorsList.map(err => <AlertUI key={err} message={err} severity={"error"} position={"relative"}/>)}
        </Stack>
    );
};

export default AlertsStackUI;
