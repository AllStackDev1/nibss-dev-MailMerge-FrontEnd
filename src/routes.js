import React from "react";
import DashboardIndex from "components/Dashboard/DashboardIndex.js";
import Documents from "components/Dashboard/Documents.js";
import Users from "components/Dashboard/Users.js";
import Recipients from "components/Dashboard/Recipients";
import Help from "components/Dashboard/Help";

var routes = [
    {
        path: "/index/:pageId?",
        name: "Dashboard",
        component: (props) => <DashboardIndex {...props} />,
        icon: 'dashboard',
        height: 18
    },
    {
        path: "/documents/:pageId?",
        name: "Documents",
        component: (props) => <Documents {...props} />,
        icon: 'documents',
        user: true
    },
    {
        path: "/users/:pageId?",
        name: "Users",
        component: (props) => <Users {...props} />,
        icon: 'users',
        user: true
    },
    {
        path: "/recipients/:pageId?",
        name: "Recipients",
        component: (props) => <Recipients {...props} />,
        icon: 'recipients',
        user: true
    },
    {
        path: "/help",
        name: "Help",
        component: (props) => <Help {...props} />,
        icon: 'help',
        support: true
    }
];

export default routes;
