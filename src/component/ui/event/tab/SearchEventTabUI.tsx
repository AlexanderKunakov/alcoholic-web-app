import React from 'react';
import {Grid} from "@mui/material";
import EventPreviewUI from "../EventPreviewUI";
import {useGetAllEventsQuery} from "../../../../store/api/EventApi";
import LoaderUI from "../../LoaderUI";
import {TabPanel} from "@mui/lab";
import {FullEventDto} from "../../../../dto/FullEventDto";

const SearchEventTabUI = () => {
    const {data = [], isLoading} = useGetAllEventsQuery();

    return (
        <TabPanel value={"1"}>
            {isLoading && <LoaderUI/>}
            {data.length == 0 &&
                <Grid container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h2>There are no events available</h2>
                </Grid>
            }
            <Grid container spacing={3}>
                {data.map((event: FullEventDto) => <EventPreviewUI key={event.event.id} fullEvent={event}/>)}
            </Grid>
        </TabPanel>
    );
};

export default SearchEventTabUI;