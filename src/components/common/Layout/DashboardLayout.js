import React from "react";
import { Route, Switch } from "react-router-dom";

// core components
import Sidebar from "components/common/Sidebar/DashboardSidebar.js";

import routes from 'routes';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import AddUser from "components/Dashboard/AddUser";
import UserProfile from "components/Dashboard/UserProfile";

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

    getRoutes = routes => {
        return routes.map((prop, key) => {
            return (
                <Route
                    path={'/dashboard' + prop.path}
                    render={withRouter(prop.component)}
                    key={key}
                />
            );
        });
    };

    logout = () => {
        // this.props.userActions.logout();
        // this.props.push("/login");
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
                />
                <div className="flex-grow-1 full-width custom-scrollbar overflow-auto-y">
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect exact from="/dashboard" to="/dashboard/index" />
                        <Route path="/dashboard/add-user" render={withRouter(AddUser)} />
                        <Route path="/dashboard/user-profile" render={withRouter(UserProfile)} />
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let user = JSON.parse(localStorage.getItem('admin'));

    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        push: bindActionCreators(push, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);