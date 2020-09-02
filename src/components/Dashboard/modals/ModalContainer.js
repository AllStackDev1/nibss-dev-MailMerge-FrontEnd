import React from 'react';
import { withRouter } from "react-router";
import styled from "styled-components";

const ModalContainer = ({children, closeModal}) => {
    return (
        <Container onClick={closeModal} className="fixed left top above-all full-width full-height-vh display-flex align-items-center flex-direction-column justify-center">
            {children}
        </Container>
    );
}

const Container = styled.div`
                                background: rgba(24, 37, 56, 0.8);
                            `;

export default withRouter(ModalContainer);