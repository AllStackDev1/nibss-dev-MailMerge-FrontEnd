import React, { useState, useEffect } from 'react'
import InviteUsers from './steps/inviteUsers';
import SaveSignature from './steps/saveSignature';
import OnboardingSuccessful from './steps/onboardingSuccessful';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { authActions, userActions } from 'actions';

const Onboarding = props => {
    const [step, setStep] = useState(1);
    let userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    useEffect(() => {
        return(() => {
            dispatch(userActions.reset());
            dispatch(authActions.reset());
        });
    }, [dispatch]);

    useEffect(() => {
        if (userLocal !== undefined) {
            if (userLocal.data.status === "active") {
                console.log(1);
                
                setStep(2);
            }
        }
    }, [userLocal]);

    useEffect(() => {
        if (auth.uploading === false && auth.uploaded === 1) {
            console.log(2);

            if (userLocal.data.role === "administrator") {
                setStep(step => step + 1);
            } else {
                setStep(3);
            }
        }
    }, [auth.uploading, auth.uploaded, userLocal]);

    useEffect(() => {
        if (user.invitingUsers === false && user.users) {
            console.log(3);

            if (userLocal.data.status === "active") {
                dispatch(push(`/dashboard/index`));
            } else {
                setStep(step => step + 1);
            }
        }
    }, [user.invitingUsers, user.users, userLocal.data.status, dispatch]);

    return (
        <div className="full-height-vh full-width display-flex light-brown">
            <div className="width-20-percent full-height white box-shadow-less2 padding-20 border-box">
                <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-40" alt="NIBSS logo" />
                <div className="left-padding-20 right-padding-20">
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-50 light-gray"></div>
                    <div className="height-12 width-50-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 light-gray"></div>
                </div>
            </div>
            <div className={`${step === 3 ? 'display-flex align-items-center' : ''} full-width full-height overflow-scroll-y custom-scrollbar`}>
                <div className={`${step === 3 ? 'height-60-percent bottom-padding-50' : 'onboarding bottom-padding-150'} smooth overflow-hidden width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                    {step === 1 ?
                        <SaveSignature
                            step={step}
                            setStep={setStep} />
                        : ""}
                    {step === 2 ?
                        <InviteUsers
                            step={step}
                            setStep={setStep} />
                        : ""}
                    {step === 3 ?
                        <OnboardingSuccessful />
                        : ""}

                </div>
            </div>
        </div>
    );
}

export default Onboarding