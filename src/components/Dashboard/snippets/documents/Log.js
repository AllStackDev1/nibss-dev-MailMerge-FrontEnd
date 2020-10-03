import React from 'react';
import styled from 'styled-components';

const Log = ({ log }) => {
    return (
        <Container className="full-width display-flex">
            <Circle className="width-20 height-20 border-radius-100-percent right-margin-30 no-shrink top-margin-5"></Circle>
            <div className="full-width bottom-padding-30">
                <p className="size-one-rem">{log.log}</p>
                <p className="size-pointeightfive-rem bold top-margin-10">Office Desk Officer</p>
                <Link></Link>
            </div>
            <Ago className="width-100 no-shrink text-right size-pointeight-rem">
                20 mins ago
            </Ago>
        </Container>
    );
};

const Circle = styled.div`
    background: #FFC61A;
`;

const Ago = styled.div`
    color: #919AA3;
`;

const Link = styled.div`
    width: 1px;
    height: calc(100% - 30px);
    position: absolute;
    left: -40px;
    top: 30px;
    border-left: 1px dashed #AAA;
`;

const Container = styled.div`
    &:last-of-type>div:nth-of-type(2)>div:last-of-type{
        display: none;
    }
`;

export default Log;
