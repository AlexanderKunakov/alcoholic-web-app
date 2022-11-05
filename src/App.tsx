import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRouteComponent from "./component/auth/PrivateRouteComponent";
import LayoutComponent from "./component/LayoutComponent";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import as from "./App.module.sass";
import ProfilePage from "./page/ProfilePage";
import EventsPage from "./page/event/multiple/EventsPage";
import PublicRouteComponent from "./component/auth/PublicRouteComponent";
import PersistAuthComponent from "./component/auth/PersistAuthComponent";
import EventPage from "./page/event/single/EventPage";
import NotFoundPage from "./page/NotFoundPage";
import EventInvitationPreviewPage from "./page/event/invitation/EventInvitationPreviewPage";
import AlertsStackUI from "./component/ui/util/AlertsStackUI";

function App() {
    return (
        <div className={as.app}>
            <AlertsStackUI/>
            <PersistAuthComponent>
                <Routes>
                    <Route element={
                        <PrivateRouteComponent>
                            <LayoutComponent/>
                        </PrivateRouteComponent>}
                    >
                        <Route index element={<EventsPage/>}/>
                        <Route path={"/profile"} element={<ProfilePage/>}/>
                        <Route path={"/event/:id"} element={<EventPage/>}/>
                        <Route path={"/event/invite/:id"} element={<EventInvitationPreviewPage/>}/>
                        <Route path={"/*"} element={<NotFoundPage/>}/>
                    </Route
                    >
                    <Route path={"/login"} element={<PublicRouteComponent><LoginPage/></PublicRouteComponent>}/>
                    <Route path={"/register"} element={<PublicRouteComponent><RegisterPage/></PublicRouteComponent>}/>
                    <Route path={"/*"} element={<NotFoundPage/>}/>
                </Routes>
            </PersistAuthComponent>
        </div>
    );
}

export default App;
