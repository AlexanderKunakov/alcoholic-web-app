import React from 'react';
import {useParams} from "react-router-dom";
import {useGetEventQuery} from "../../../store/api/EventApi";
import {Box, Card, CardMedia, Container, Grid} from "@mui/material";
import LoaderUI from "../../../component/ui/LoaderUI";
import {useAppSelector} from "../../../store/hook/Redux";
import EventButtonResolverUI from "../../../component/ui/event/button/EventButtonResolverUI";
import EventPageMainTab from "../../../component/ui/event/single/tab/EventPageMainTab";
import Styles from "./Styles";
import InvitationLinkButton from "../../../component/ui/button/InvitationLinkButton";
import Carousel from 'react-material-ui-carousel'
import {ALCOPARTY_URL} from "../../../util/EnvUtil";

const EventPage = () => {
    const {id} = useParams();
    const {jwt} = useAppSelector(state => state.authReducer);
    const {data: singleEvent} = useGetEventQuery(id!!);

    if (!singleEvent) {
        return (
            <LoaderUI/>
        );
    }

    return (
        <Container>
            <Grid container spacing={3} sx={Styles.gridContainer}>
                <Grid item md={4} sm={6} xs={6}>
                    <Card sx={Styles.card}>
                        <CardMedia sx={Styles.cardMedia}>
                            {singleEvent.images.length > 0
                                ? <Carousel sx={Styles.cardMedia}>
                                    {singleEvent.images.map(id => (
                                        <Box component={"img"}
                                             sx={Styles.cardMedia}
                                             src={`${ALCOPARTY_URL}api/alcoparty/image/${id}`}
                                             alt={singleEvent.event.title}
                                             key={id}
                                        />
                                    ))}
                                </Carousel>
                                : <Box component={"img"}
                                       sx={Styles.cardMedia}
                                       src={require("../../../image/1.jpg")}
                                       alt={singleEvent.event.title}
                                />}
                        </CardMedia>
                    </Card>
                </Grid>
                <Grid item md={8} sm={6} xs={6}>
                    <EventPageMainTab singleEvent={singleEvent} isOwner={singleEvent?.event.createdBy === jwt?.sub!!}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} sx={Styles.eventButton}>
                    {singleEvent?.event.createdBy === jwt?.sub!! &&
                        <InvitationLinkButton eventId={singleEvent.event.id}/>
                    }
                    <Box sx={{flexGrow: 1}}/>
                    <EventButtonResolverUI
                        eventId={singleEvent.event.id}
                        isOwner={singleEvent?.event.createdBy === jwt?.sub!!}
                        isParticipant={singleEvent.participants.includes(jwt?.sub!!, 0)}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EventPage;
