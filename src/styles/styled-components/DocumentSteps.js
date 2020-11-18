

import Styled from "styled-components";

const Step = Styled.div`
                        border: 1px solid rgba(145, 154, 163, 0.2);
                        background: #FFF;
                        color: #919AA3;
                        &.active-step {
                            background: #9E7D0A;
                            color: #FFF
                        }
                    `;

const StepDelimiter = Styled.div`
                        height: 2px;
                        width: 25px;
                        background: #919AA3;
                        margin-left: 7px;
                        margin-right: 7px;
                        border-radius: 2px;
                        opacity: 0.5;
                    `;

export { Step, StepDelimiter };
