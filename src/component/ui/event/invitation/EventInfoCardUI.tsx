import React, {FC} from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {epochToDate} from "../../../../util/DateUtil";
import {SingleEventResponse} from "../../../../dto/reponse/SingleEventResponse";

interface IEventInfoCardUI {
    event: SingleEventResponse,
    buttonText: string,
    onClick: () => void
}

const EventInfoCardUI: FC<IEventInfoCardUI> = ({event, buttonText, onClick}) => {
    return (
        <Card sx={{mt: 3, width: "50%"}}>
            <CardMedia component="img"
                       image={
                           event.images.length > 0
                               ? `api/alcoparty/image/${event.images[0]}`
                               : require("../../../../image/1.jpg")
                       }
                       alt={event.event.title}
                       sx={{objectFit: "cover", height: "20rem", width: "100%"}}
            />
            <CardContent sx={{flexGrow: 1}}>
                <Typography align={"center"} variant={"h5"}>{
                    event.event.title.length <= 27
                        ? event.event.title
                        : event.event.title.substring(0, 27)
                }
                </Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", mt: 1}}>
                    <Typography variant={"body2"}>{epochToDate(event.event.startDate)}</Typography>
                    <Typography variant={"body2"}>{epochToDate(event.event.endDate)}</Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{flexGrow: 1}}/>
                <Button onClick={onClick} variant={"contained"} fullWidth>{buttonText}</Button>
            </CardActions>
        </Card>
    );
};

export default EventInfoCardUI;