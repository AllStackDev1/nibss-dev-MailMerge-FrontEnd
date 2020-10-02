import DashboardIndex from "components/Dashboard/DashboardIndex.js";
import Documents from "components/Dashboard/Documents.js";
import Users from "components/Dashboard/Users.js";
import Recipients from "components/Dashboard/Recipients";
import Help from "components/Dashboard/Help";

var routes = [
    {
        path: "/index/:pageId?",
        name: "Dashboard",
        component: DashboardIndex,
        icon: 'dashboard',
        height: 18
    },
    {
        path: "/documents/:pageId?",
        name: "Documents",
        component: Documents,
        icon: 'documents',
        user: true
    },
    {
        path: "/users/:pageId?",
        name: "Users",
        component: Users,
        icon: 'users',
        user: true
    },
    {
        path: "/recipients/:pageId?",
        name: "Recipients",
        component: Recipients,
        icon: 'recipients',
        user: true
    },
    {
        path: "/help",
        name: "Help",
        component: Help,
        icon: 'help',
        support: true
    }
];

export default routes;
