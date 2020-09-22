import React from 'react';
import 'styles/sidebar.css';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import styled from 'styled-components';
import { getColor } from 'helpers/getColor';
import { getInitials } from 'helpers/getInitials';

const DashboardSidebar = ({ routes, logout, location, user }) => {
    return (
        <div className={`no-select sidebar-links full-height no-shrink border-box no-repeat-bg sidebar above-2 border-topright-50`}>
            <div className="full-height full-width display-flex flex-direction-column">
                <div className="bottom-padding-10 border-bottom bottom-margin-20 no-shrink">
                    <img src={require(`images/logo.svg`)} className="height-60" alt="NIBSS Empty" />
                </div>
                <div className="display-flex flex-direction-column align-items-center bottom-margin-30 no-shrink">
                    <Profile style={{ backgroundColor: getColor(user ? user.data.name : "") }} className="width-70 height-70 border-radius-100-percent">
                        <span className="size-onepointone-rem white-color">{user ? user.data.name ? getInitials(user.data.name) : "" : ""}</span>
                        <Link to="/dashboard/user-profile" className="white border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/settings.svg`)} className="height-18" alt="NIBSS Empty" />
                        </Link>
                    </Profile>
                    <p className="size-pointeightfive-rem top-margin-10 bold">{user ? user.data.name : ""}</p>
                    <Gray className="size-pointseven-rem">{user ? user.data.email : ""}</Gray>
                </div>
                <LinkContainer className="full-height overflow-auto-y custom-scrollbar">
                    {routes.map((route, index) =>
                        route.support === true ?
                            <div key={index} className="top-margin-70 top-padding-30 border-top-gray">
                                <Link to={`/dashboard${route.path.includes("/:") ? route.path.split("/:")[0] : route.path}`} key={index}>
                                    <RouteLink className={`${location.pathname === `/dashboard${route.path.includes("/:") ? route.path.split("/:")[0] : route.path}` ? 'active-link' : ''} display-flex align-items-center border-box dash-link overflow-hidden left-padding-10`}>
                                        <div className={`display-flex align-items-center width-40 height-50 left-margin-0 overflow-hidden`}>
                                            <div className="smooth display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                                <img src={require(`images/icons/dashboard/${route.icon}.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                            </div>
                                            <div className="smooth display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                                <img src={require(`images/icons/dashboard/${route.icon}-brown.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                            </div>
                                            <div className="display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                                <img src={require(`images/icons/dashboard/${route.icon}-white.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                            </div>
                                        </div>
                                        <div className="smooth height-45 left-padding-10 display-flex align-items-center size-pointeight-rem bold no-wrap">
                                            {route.name}
                                        </div>
                                    </RouteLink>
                                </Link>
                            </div>
                            :
                            <Link to={`/dashboard${route.path.includes("/:") ? route.path.split("/:")[0] : route.path}`} key={index}>
                                <RouteLink className={`${location.pathname === `/dashboard${route.path.includes("/:") ? route.path.split("/:")[0] : route.path}` ? 'active-link' : ''} display-flex align-items-center border-box dash-link overflow-hidden left-padding-10`}>
                                    <div className={`display-flex align-items-center width-40 height-50 left-margin-0 overflow-hidden`}>
                                        <div className="smooth display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                            <img src={require(`images/icons/dashboard/${route.icon}.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                        </div>
                                        <div className="smooth display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                            <img src={require(`images/icons/dashboard/${route.icon}-brown.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                        </div>
                                        <div className="display-flex align-items-center justify-center width-40 height-40 no-shrink">
                                            <img src={require(`images/icons/dashboard/${route.icon}-white.svg`)} className={`height-${route.height ? route.height : '20'}`} alt="NIBSS Empty" />
                                        </div>
                                    </div>
                                    <div className="smooth height-45 left-padding-10 display-flex align-items-center size-pointeight-rem bold no-wrap">
                                        {route.name}
                                    </div>
                                </RouteLink>
                            </Link>
                    )}
                </LinkContainer>
                <Link to="/" className="full-width no-shrink display-block margin-bottom-30">
                    <LogOut className={`display-flex full-width align-items-center border-box dash-link overflow-hidden cursor-pointer`} onClick={logout}>
                        <div className={`display-flex align-items-center justify-center width-40 height-50 left-margin-0`}>
                            <img src={require(`images/icons/logout.svg`)} className="height-20" alt="NIBSS Logout" />
                        </div>
                        <div className="height-45 left-padding-10 display-flex align-items-center size-pointeightfive-rem bold no-wrap">
                            Log out
                        </div>
                    </LogOut>
                </Link>
            </div>
        </div>
    )
}

const RouteLink = styled.div`border-radius: 10px;
                            margin-bottom: 10px;
                            &.active-link {
                                background: #9E7D0A;
                            }
                            &>div {
                                color: #919AA3;
                            }
                            &>div:first-of-type>div:first-of-type {
                                margin-left: 0;
                            }
                            &:hover>div:first-of-type>div:first-of-type {
                                margin-left: -40px;
                            }
                            &.active-link>div:first-of-type>div:first-of-type {
                                margin-left: -80px;
                            }
                            &.active-link>div:nth-of-type(2) {
                                color: #FFF;
                            }
                            &:not(.active-link):hover>div:nth-of-type(2) {
                                color: #9E7D0A;
                            }`;

const Profile = styled.div`display: flex;
                            align-items: center;
                            justify-content: center;
                            &>a {
                                width: 30px;
                                height: 30px;
                                position: absolute;
                                bottom: -5px;
                                right: -5px;
                                border: 1px solid #FFF;
                                cursor: pointer;
                            }
                            &>a:hover {
                                border: 1px solid #CCC;
                            }`;

const Gray = styled.div`color: #919AA3;`;

const LinkContainer = styled.div`
    width: calc(100% + 30px);
    margin-left: -20px;
    padding-left: 20px;
    padding-right: 10px;
    box-sizing: border-box;
`;

const LogOut = styled.div`background: #E74D0B;
                            width: calc(100% - 40px);
                            border-radius: 8px;
                            padding: 0 10px;
                            &>div {
                                color: #FFF;
                            }`;

export default withRouter(DashboardSidebar);