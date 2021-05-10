import React from 'react';
import { Route, Redirect } from "react-router-dom";
function PageProtection({
    isAuth: isAuth,
    verified_by_admin: verified_by_admin,
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (true) {
                    return <Component />
                } else {
                    return <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }} />
                }
            }
            } />
    );
}
export default PageProtection;