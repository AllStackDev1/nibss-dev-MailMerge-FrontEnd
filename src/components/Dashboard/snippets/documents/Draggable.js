import React, { useState, useEffect } from "react"
import $ from 'jquery'
import styled from "styled-components"

const Draggable = ({ initialPos, children, mouseUp, user, setSignatoryDragged }) => {
    const [pos, setPos] = useState(initialPos);
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState(null);

    const posRef = React.useRef(pos);
    const setPosRef = React.useRef(setPos);

    // we could get away with not having this (and just having the listeners on
    // our div), but then the experience would be possibly be janky. If there's
    // anything w/ a higher z-index that gets in the way, then you're toast,
    // etc.

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }
        // eslint-disable-next-line
    }, [dragging]);

    // calculate relative position to the mouse and set dragging=true
    const onMouseDown = (e) => {
        // only left mouse button
        if (e.button !== 0) {
            return
        }
        var elemPos = $(e.target).offset()

        setDragging(true);
        user && setSignatoryDragged(user);
        setRel({
            x: e.pageX - (elemPos?.left || 0),
            y: e.pageY - (elemPos?.top || 0)
        });

        e.stopPropagation()
        e.preventDefault()
    }

    const onMouseUp = (e) => {
        setDragging(false);

        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        mouseUp(posRef.current.x, posRef.current.y);
        setPosRef.current({ x: 0, y: 0 });

        e.stopPropagation()
        e.preventDefault()
    };

    const onMouseMove = (e) => {
        if (!dragging) {
            return
        }

        posRef.current = {
            x: e.pageX - rel.x,
            y: e.pageY - rel.y
        };

        setPos({
            x: e.pageX - rel.x,
            y: e.pageY - rel.y
        });

        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <Container
            onMouseDown={onMouseDown}
            style={{
                position: `${dragging ? 'fixed' : 'absolute'}`,
                left: pos ? `${pos.x}px` : 0,
                top: pos ? `${pos.y}px` : 0
            }}
            className="display-flex align-items-center bottom-margin-10 full-width padding-15"
        >{children}</Container>
    )
}

const Container = styled.div`
    cursor: pointer;
    background-color: #cca;
    width: 180px !important;
    box-sizing: border-box;
    background: #FAF8F3;
`;

export default Draggable;


