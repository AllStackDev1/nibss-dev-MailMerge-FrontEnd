import React from "react";
import { Route, Switch } from "react-router-dom";

// core components
import Sidebar from "components/common/Sidebar/DashboardSidebar.js";

import routes from 'routes';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import AddUser from "components/Dashboard/AddUser";
import UserProfile from "components/Dashboard/UserProfile";
import { authActions } from "actions";
import AddSignature from "components/Dashboard/AddSignature";
import AppendSignature from "components/Dashboard/AppendSignature";
import DocumentInstance from "components/Dashboard/DocumentInstance";

class DashboardLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewingLinks: false
        };
    }

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    getRoutes = r => {
        return r.map((prop, key) => {
            return (
                <Route
                    path={'/dashboard' + prop.path}
                    key={key}
                >
                    {prop.component({
                        user: this.props.user
                    })}
                </Route>
            );
        });
    };

    logout = () => {
        this.props.authActions.logout();
        this.props.push("/");
    }

    render() {
        return (
            <div className="full-height-vh full-width display-flex light-brown">
                <Sidebar
                    {...this.props}
                    routes={routes}
                    logout={this.logout}
                    user={this.props.user}
                    logo={{
                        innerLink: "/admin/index",
                        imgAlt: "..."
                    }}
                data-test="sidebar"/>
                <div className="flex-grow-1 full-width">
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect exact from="/dashboard" to="/dashboard/index" />
                        <Route path="/dashboard/add-user">
                            <AddUser user={this.props.user} />
                        </Route>
                        <Route path="/dashboard/add-signature">
                            <AddSignature user={this.props.user} />
                        </Route>
                        <Route path="/dashboard/append-signature/:documentId?/:userToken?">
                            <AppendSignature user={this.props.user} />
                        </Route>
                        <Route path="/dashboard/document/:documentId?">
                            <DocumentInstance user={this.props.user} />
                        </Route>
                        <Route path="/dashboard/user-profile">
                            <UserProfile user={this.props.user} />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const user = JSON.parse(localStorage.getItem('nibss-user'));

    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        push: bindActionCreators(push, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
