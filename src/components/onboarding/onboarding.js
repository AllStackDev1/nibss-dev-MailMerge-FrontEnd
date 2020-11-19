import React, { useState, useEffect } from 'react'
import InviteUsers from './steps/inviteUsers';
import SaveSignature from './steps/saveSignature';
import OnboardingSuccessful from './steps/onboardingSuccessful';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { authActions, userActions } from 'actions';
import EmptySidebar from 'components/Dashboard/snippets/EmptySidebar';

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
        if (auth.uploading === false && auth.uploaded === 1) {
            if (userLocal.data.role === "administrator") {
                setStep(s => s + 1);
            } else {
                setStep(3);
            }
        }
    }, [auth.uploading, auth.uploaded, userLocal]);

    useEffect(() => {
        if (userLocal?.data?.role === "administrator" && user.invitingUsers === false && user.users) {
            if (userLocal.data.status === "active") {
                dispatch(push(`/dashboard/index`));
            } else {
                setStep(s => s + 1);
            }
        }
    }, [user.invitingUsers, user.users, userLocal.data, dispatch]);

    return (
        <div className="full-height-vh full-width display-flex light-brown">
            <EmptySidebar />
            <div className={`${step === 3 ? 'display-flex align-items-center' : ''} full-width full-height overflow-scroll-y custom-scrollbar`}>
                <div
                    className={`
                        ${step === 3 ? 'height-60-percent bottom-padding-50' : 'onboarding bottom-padding-150'} 
                        smooth 
                        overflow-hidden 
                        width-70-percent 
                        margin-auto 
                        top-margin-70 
                        bottom-margin-5-percent 
                        border-box 
                        top-padding-50 
                        white 
                        border-radius-10 
                        box-shadow-less2`}>
                    {step === 1 &&
                        <SaveSignature
                            step={step}
                            setStep={setStep} />}
                    {step === 2 &&
                        <InviteUsers
                            step={step}
                            setStep={setStep} />}
                    {step === 3 &&
                        <OnboardingSuccessful
                            userLocal={userLocal} />}

                </div>
            </div>
        </div>
    );
}

export default Onboarding;
