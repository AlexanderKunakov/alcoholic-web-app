import React, {useEffect} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {useDisbandEventMutation, useJoinEventMutation, useLeaveEventMutation} from "../../../../store/api/EventApi";
import {useNavigate} from "react-router-dom";

export interface IEventButtonUI {
    eventId: string,
    isOwner: boolean,
    isParticipant: boolean,
    fullWidth?: boolean,
}

const EventButtonResolverUI = ({eventId, isOwner, isParticipant, fullWidth}: IEventButtonUI) => {
    const navigate = useNavigate();
    const [joinEvent] = useJoinEventMutation();
    const [leaveEvent] = useLeaveEventMutation();
    const [disband, {isSuccess: isDisbandSuccess,}] = useDisbandEventMutation();

    function onJoin() {
        joinEvent(eventId);
    }

    function onLeave() {
        leaveEvent(eventId);
    }

    function onDisband() {
        disband(eventId);
    }

    useEffect(() => {
        if (isDisbandSuccess) {
            navigate("/", {replace: true});
        }
    }, []);

    return (
        <ButtonGroup variant={"outlined"} fullWidth={fullWidth}>
            {!isOwner && !isParticipant && <Button onClick={onJoin}>Join</Button>}
            {isOwner && <Button onClick={onDisband} color={"error"}>Disband </Button>}
            {!isOwner && isParticipant && <Button onClick={onLeave} color={"error"}>Leave</Button>}
        </ButtonGroup>
    );
};

export default EventButtonResolverUI;
