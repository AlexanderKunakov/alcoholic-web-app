import React from 'react';
import {Container} from "@mui/material";
import EventMainTabUI from "../../../component/ui/event/multiple/tab/EventMainTabUI";

const EventsPage = () => {
    return (
        <Container sx={{flex: "1 0 auto"}}>
            <EventMainTabUI/>
        </Container>
    );
};

export default EventsPage;
