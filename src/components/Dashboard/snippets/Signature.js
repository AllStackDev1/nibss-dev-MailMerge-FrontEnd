import React from 'react'
import styled from 'styled-components'

const Signature = () => {
    return (
        <SignatureContainer url={require(`images/icons/dashboard/signature.svg`)} className="bottom-margin-20 display-flex flex-direction-column">
            <div className="full-width full-height"></div>
            <div className="full-width height-40 no-shrink display-flex align-items-center justify-center">
                <img src={require(`images/icons/dashboard/delete.svg`)} className="height-15 right-margin-10" alt="NIBSS Empty" />
                Delete
            </div>
        </SignatureContainer>
    );
}

const SignatureContainer = styled.div`
                        width: calc((100% - 40px) / 3);
                        height: 200px;
                        &>div:first-of-type {
                            background-color: #F5F5F5;
                            background-image: url(${props => props.url});
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                        &>div:nth-of-type(2) {
                            color: #F82E2E;
                            font-size: 0.8rem;
                        }
                    `;

export default Signature