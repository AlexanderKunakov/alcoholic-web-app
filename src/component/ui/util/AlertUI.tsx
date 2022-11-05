import React, {FC} from 'react';
import {Alert, Box, Grow} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useDispatch} from "react-redux";
import {removeError} from "../../../store/reducer/ErrorsSlice";

export interface IAlertUI {
    message: string,
    severity: "error" | "info" | "warning" | "success",
    position: "relative" | "absolute"
}

const AlertUI: FC<IAlertUI> = ({message, severity, position}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(!!message);
    setTimeout(() => setOpen(false), 5000);
    setTimeout(() => dispatch(removeError(message)), 5000);

    return (
        <Box key={message} position={position} zIndex={1400}>
            <Grow in={open}>
                <Alert sx={{display: "flex", minWidth: "20rem", justifyContent: "center"}}
                       severity={severity}
                       variant={"standard"}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpen(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit"/>
                           </IconButton>
                       }
                >
                    {message}
                </Alert>
            </Grow>
        </Box>
    );
};

export default AlertUI;
