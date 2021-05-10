import React from 'react';
import { Route, Redirect } from "react-router-dom";
function AdminRoute({
    isAuth: isAuth,
    role: role,
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (true) {
                    return (
                        <Component />
                    );
                } else {
                    return (<Redirect
                        to={{
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }} />);
                }
            }
            } />
    );
}
export default AdminRoute;