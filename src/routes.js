import DashboardIndex from "components/Dashboard/DashboardIndex.js";
import Documents from "components/Dashboard/Documents.js";
import Users from "components/Dashboard/Users.js";
import Recipients from "components/Dashboard/Recipients";
import Help from "components/Dashboard/Help";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        component: DashboardIndex,
        icon: 'dashboard',
        height: 18
    },
    {
        path: "/documents",
        name: "Documents",
        component: Documents,
        icon: 'documents'
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        icon: 'users'
    },
    {
        path: "/recipients",
        name: "Recipients",
        component: Recipients,
        icon: 'recipients'
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
