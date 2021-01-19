import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { authActions, userActions } from 'actions';
import EmptySidebar from 'components/Dashboard/snippets/EmptySidebar';
import OnboardingContainer from './OnboardingContainer';

const Onboarding = props => {
    const [step, setStep] = useState(1);
    const userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    useEffect(() => {
        return (() => {
            dispatch(userActions.reset());
            dispatch(authActions.reset());
        });
    }, [dispatch]);

    useEffect(() => {
        if (userLocal?.data.status === "active") {
            setStep(2);
        }
    }, [userLocal]);

    useEffect(() => {
        if (auth?.uploading === false && auth.uploaded === 1) {
            if (userLocal.data.role === "administrator") {
                setStep(s => s + 1);
            } else {
                setStep(3);
            }
        }
    }, [auth?.uploading, auth?.uploaded, userLocal]);

    useEffect(() => {
        if (userLocal?.data?.role === "administrator" && user.invitingUsers === false && user.users) {
            if (userLocal.data.status === "active") {
                dispatch(push(`/dashboard/index`));
            } else {
                setStep(s => s + 1);
            }
        }
    }, [user?.invitingUsers, user?.users, userLocal?.data, dispatch]);

    return (
        <div className="full-height-vh full-width display-flex light-brown">
            <EmptySidebar />
            <OnboardingContainer step={step} setStep={setStep} userLocal={userLocal} />
        </div>
    );
}

export default Onboarding;
