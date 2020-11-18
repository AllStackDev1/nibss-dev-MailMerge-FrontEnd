import Styled from "styled-components";

const Tabs = Styled.div`
                        border: 1px solid #DDD;
                        margin-top: 30px;
                        margin-bottom: 20px;
                    `;

const Tab = Styled.div`
                        &.active-tab {
                            background: rgba(158, 125, 10, 0.3);
                            font-weight: bold;
                        }
                        &.active-tab, &:hover {
                            color: #9E7D0A;
                        }
                        & > div {
                            background: #9E7D0A;
                            position: absolute;
                            bottom: 0;
                        }
                        &.active-tab > div, &:hover > div {
                            height: 3px;
                        }
                    `;

export { Tabs, Tab };
