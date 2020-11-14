/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'actions';
import DeleteSignature from '../modals/DeleteSignature';
import ModalContainer from '../modals/ModalContainer';

const Signature = ({ signature }) => {
    const [modal, setModal] = useState("");
    const [toDelete, setToDelete] = useState({});
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const initiateDeleteSignature = s => {
        setToDelete(s);
        setModal("delete-signature");
    }

    const deleteSignature = () => {
        dispatch(authActions.deleteSignature(toDelete));
    }

    useEffect(() => {
        if (auth.deletingSignature === false) {
            setModal("");
            setToDelete({});
        }
    }, [auth.deletingSignature]);

    const renderModals = () => {
        if (modal === "delete-signature") {
            return <DeleteSignature
                deleting={auth.deletingSignature}
                onSubmit={deleteSignature}
                closeModal={() => {
                    setModal("");
                    setToDelete({});
                }} />
        }

        return <div></div>
    }

    return (
        <>
            {modal !== "" ?
                <ModalContainer closeModal={() => setModal("")}>
                    {renderModals()}
                </ModalContainer>
                : ""}
            <SignatureContainer url={signature} className="bottom-margin-20 display-flex flex-direction-column">
                <div className="full-width full-height display-flex align-items-center justify-center">
                    <div className="width-80-percent height-60-percent"></div>
                </div>
                <button
                    onClick={() => initiateDeleteSignature(signature)}
                    className="cursor-pointer no-select full-width height-40 no-shrink display-flex align-items-center justify-center">
                    <img src={require(`images/icons/dashboard/delete.svg`)} className="height-15 right-margin-10" alt="NIBSS Empty" />
                Delete
            </button>
            </SignatureContainer>
        </>
    );
}

const SignatureContainer = styled.div`
                        width: calc((100% - 60px) / 3);
                        margin-right: 20px;
                        height: 200px;
                        &>div:first-of-type {
                            background-color: #F5F5F5;
                        }
                        &>div>div {
                            background-image: url(${props => props.url});
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: contain;
                        }
                        &>button {
                            color: #F82E2E;
                            font-size: 0.8rem;
                        }
                    `;

export default Signature;
