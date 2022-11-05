import React, {useState} from 'react';
import {TabContext} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import NewEventTabUI from "./NewEventTabUI";
import SearchEventTabUI from "./SearchEventTabUI";

const EventMainTabUI = () => {
    const [tabValue, setTabValue] = useState<number>(0);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    return (
        <TabContext value={`${tabValue}`}>
            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="New"/>
                <Tab label="Search"/>
            </Tabs>
            <NewEventTabUI/>
            <SearchEventTabUI/>
        </TabContext>
    );
};

export default EventMainTabUI;
