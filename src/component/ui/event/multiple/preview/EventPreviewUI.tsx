import React, {FC} from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {MultipleEventResponse} from "../../../../../dto/reponse/MultipleEventResponse";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../../store/hook/Redux";
import EventButtonResolverUI from "../../button/EventButtonResolverUI";
import Styles from "./Styles";
import {ALCOPARTY_URL} from "../../../../../util/EnvUtil";

interface IEventPreview {
    multipleEventResponse: MultipleEventResponse,
}

const EventPreviewUI: FC<IEventPreview> = ({multipleEventResponse}) => {
    const {jwt} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    const event = multipleEventResponse.event;

    function handleNavigateToEventCard() {
        navigate(`/event/${event.id}`);
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={Styles.card}>
                <CardMedia onClick={handleNavigateToEventCard}
                           component="img"
                           image={
                               multipleEventResponse.image
                                   ? `${ALCOPARTY_URL}/api/alcoparty/image/${multipleEventResponse.image}`
                                   : require("../../../../../image/1.jpg")
                           }
                           alt={event.title}
                           sx={Styles.cardMedia}
                />
                <CardContent onClick={handleNavigateToEventCard} sx={Styles.cardContent}>
                    <Typography gutterBottom variant="body1" component="h2">
                        {event.title.length > 30 ? event.title.substring(0, 20).concat("...") : event.title}
                    </Typography>
                    <Typography>
                        {event.info.length > 60 ? event.info.substring(0, 40).concat("...") : event.info}
                    </Typography>
                </CardContent>
                <CardActions>
                    <EventButtonResolverUI eventId={event.id}
                                           isOwner={jwt?.sub === event.createdBy}
                                           isParticipant={multipleEventResponse.isParticipant}
                                           fullWidth
                    />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default EventPreviewUI;
