import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageProtection from "./Pages/PageProtection/PageProtection.js";
import AdminRoute from "./Pages/PageProtection/AdminRoute.js";
import Header from "./Pages/Header/Header";
import Marketplace from "./Marketplace/Marketplace";
import Participants from "./Participants/Participants";
import Profile from "./profile/Profile";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./Pages/SignUp/SignUp.js";
import Product from "./Product/Product";
import Suit from "./SuitCase/Suit";
import Settings from "./Pages/Settings/Settings.js";
import EventMarketplace from "./Pages/EventMarketplace/EventMarketplace.js";
import MeetingInbox from "./Pages/MeetingInbox/MeetingInbox.js";
import DashboardAdmin from "./Pages/DashboardAdmin/DashboardAdmin.js";
import DashParticipants from "./Pages/DashboardAdmin/components/Participants/DashParticipants.js";
import DashPosts from "./Pages/DashboardAdmin/components/Posts/DashPosts.js";
import DashEvents from "./Pages/DashboardAdmin/components/Events/DashEvents.js";
import DashAccounts from "./Pages/DashboardAdmin/components/Accounts/DashAccounts.js";
import Footer from "./Pages/Footer/Footer.js";
import Event from "./Event/Events";
import ProfileEvent from "./Event/ProfileEvent";
import Others from "./profile/Profiles";

function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [_id, set_id] = useState("123");
    const [role, setRole] = useState("-1");
    const [verified_by_admin, set_verified_by_admin] = useState("false");

    return (
        <Router>
            <Header isAuth={isAuth} role={role} />

            <Switch>

                <Route exact="exact" path="/" component={Home} />

                <PageProtection
                    exact="exact"
                    path="/eventmarketplace/:id"
                    component={() => <EventMarketplace _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/meetinginbox"
                    component={() => <MeetingInbox _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <Route
                    exact="exact"
                    path="/login"
                    component={() => <Login
                        setIsAuth={setIsAuth}
                        set_id={set_id}
                        setRole={setRole}
                        set_verified_by_admin={set_verified_by_admin} />}
                    isAuth={!isAuth} />

                <Route exact="exact" path="/signup" component={() => <SignUp />} />

                <AdminRoute
                    exact="exact"
                    path="/dashboardadmin"
                    component={DashboardAdmin}
                    isAuth={isAuth}
                    role={role} />

                <AdminRoute
                    exact="exact"
                    path="/dashaccounts"
                    component={DashAccounts}
                    isAuth={isAuth}
                    role={role} />

                <AdminRoute
                    exact="exact"
                    path="/dashparticipants"
                    component={DashParticipants}
                    isAuth={isAuth}
                    role={role} />

                <AdminRoute
                    exact="exact"
                    path="/dashevents"
                    component={DashEvents}
                    isAuth={isAuth}
                    role={role} />

                <AdminRoute
                    exact="exact"
                    path="/dashposts"
                    component={DashPosts}
                    isAuth={isAuth}
                    role={role} />
                <Route exact="exact" path="/events" component={Event} /> {/* Protected Pages */}

                <Route exact="exact" path="/event" component={() => <ProfileEvent />} />

                <Route exact="exact" path="/event/:id" component={() => <ProfileEvent />} />
                <PageProtection
                    exact="exact"
                    path="/others"
                    component={() => <Others />}
                    isAuth={isAuth} />
                <PageProtection
                    exact="exact"
                    path="/others/:id"
                    component={() => <Others />}
                    isAuth={isAuth} />
                <PageProtection
                    exact="exact"
                    path="/marketplace/:id"
                    component={() => <Marketplace _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/profile"
                    component={() => <Profile _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/settings"
                    component={() => <Settings _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/suitcase"
                    component={() => <Suit _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/participants/:id"
                    component={() => <Participants _id={_id} />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/product"
                    component={() => <Product />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />

                <PageProtection
                    exact="exact"
                    path="/product/:id"
                    component={() => <Product />}
                    isAuth={isAuth}
                    verified_by_admin={verified_by_admin} />
            </Switch>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!" />

        </Router>
    );
}

export default App;