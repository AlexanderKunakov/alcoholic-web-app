import React, {FC, ReactElement} from 'react';
import {Tooltip} from "@mui/material";
import Styles from "./Styles";

interface IToolTipUI {
    children: ReactElement,
    title: string,
    placement?: | "bottom-end"
        | "bottom-start"
        | "bottom"
        | "left-end"
        | "left-start"
        | "left"
        | "right-end"
        | "right-start"
        | "right"
        | "top-end"
        | "top-start"
        | "top",
}

const ToolTipUI: FC<IToolTipUI> = ({children, title, placement = "right"}) => {
    return (
        <Tooltip PopperProps={{disablePortal: true}}
                 placement={placement}
                 disableFocusListener
                 disableHoverListener
                 disableTouchListener
                 disableInteractive
                 title={title}
                 arrow
                 open
                 componentsProps={{tooltip: {sx: Styles.tooltip}}}
        >
            {children}
        </Tooltip>
    );
};

export default ToolTipUI;