import React, {useEffect} from 'react';
import {Card, CardMedia, Container, Grid} from "@mui/material";
import ProfileMainTabUI from "../component/ui/profile/tab/ProfileMainTabUI";
import {useLazyGetOwnInfoQuery} from "../store/api/UserApi";
import LoaderUI from "../component/ui/LoaderUI";

const ProfilePage = () => {
    const [getOwnInfo, {data: user, isFetching}] = useLazyGetOwnInfoQuery();

    useEffect(() => {
        getOwnInfo();
    }, []);

    if (isFetching || !user) {
        return <LoaderUI/>
    }

    return (
        <Container>
            <Grid container spacing={3}
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 2,
                  }}
            >
                <Grid item md={3} sx={{height: "25rem", width: "100%"}}>
                    <Card sx={{height: "25rem", width: "100%"}}>
                        <CardMedia component="img"
                                   sx={{objectFit: "cover", height: "25rem", width: "100%"}}
                                   image={user.photoId
                                       ? `api/alcoholic/image/${user.photoId}`
                                       : require("../image/1.jpg")}
                                   alt={"Profile"}
                        />
                    </Card>
                </Grid>
                <Grid item md={9}>
                    <ProfileMainTabUI user={user}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
