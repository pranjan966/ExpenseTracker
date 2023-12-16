
import React, { Fragment } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";


const Layout = (props) => {
return (
        <Fragment>
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </Fragment>
    )
}

export default Layout;