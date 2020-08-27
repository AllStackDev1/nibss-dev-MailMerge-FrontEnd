import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'actions/userActions';
import { Link } from 'react-router-dom';

const InviteUsers = ({ step, setStep }) => {
    const [invite, setInvite] = useState({});
    const [invited, setInvited] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        setInvite({});
    }, [invited]);

    const onChange = event => {
        const { name, value, checked, type } = event.target;

        if (type === "checkbox") {
            setInvite({
                ...invite,
                [name]: checked
            });
        } else {
            setInvite({
                ...invite,
                [name]: value
            });
        }
    }

    const addInvite = e => {
        e.preventDefault();

        setInvited(invited => ([
            ...invited,
            invite
        ]));
    }

    const sendInvites = () => {
        dispatch(userActions.invite(invited));
    }

    return (
        <>
            <div className="left-padding-80 right-padding-80">
                <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Start Inviting Users</p>
                <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">Send invitations to your colleagues and executives</p>
                <div className="height-1 width-150 margin-auto border-top-gray bottom-margin-30"></div>
                {invited.length > 0 ?
                    <div className="bottom-padding-30">
                        <p className="size-onepointtwo-rem bold bottom-padding-10 mid-gray-color">Invited</p>
                        {invited.map((inviteInstance, index) =>
                            <div key={index} className="invited full-width display-flex space-between top-padding-10">
                                <div>
                                    <p className="size-pointnine-rem bold gray-color">{inviteInstance.name}</p>
                                    <p className="size-pointeight-rem gray-color">{inviteInstance.email}</p>
                                </div>
                                <div className="display-flex align-items-center" style={{ '--vc-height': '25px', '--vc-width': '50px', '--vc-handle-width': '15px', '--vc-handle-height': '15px' }}>
                                    <div className="vc-toggle-container right-margin-20">
                                        <label className="vc-switch">
                                            <input type="checkbox" onChange={e => { let invitedVar = invited; invitedVar[index].administrator = e.target.checked; setInvited([...invitedVar]); }} checked={inviteInstance.administrator || false} className="vc-switch-input hide" />
                                            <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                            <span className="vc-handle"></span>
                                        </label>
                                    </div>
                                    {inviteInstance.administrator ?
                                        <span className="size-pointeight-rem mustard-color bold right-margin-10">Administrator</span>
                                        : ""}
                                    <img src={require(`images/icons/bin.svg`)} onClick={() => setInvited(invited.filter((_, i) => i !== index))} className="height-18 cursor-pointer" alt="Invite users" />
                                </div>
                            </div>
                        )}
                    </div>
                    : ""}
                <form onSubmit={addInvite}>
                    <div className="full-width display-flex">
                        <div className="width-50-percent right-margin-20">
                            <input type="text" name="name" onChange={onChange} value={invite.name || ""} placeholder="Full Name" required />
                        </div>
                        <div className="width-50-percent">
                            <input type="email" name="email" onChange={onChange} value={invite.email || ""} placeholder="Email Address" required />
                        </div>
                    </div>
                    <div className="full-width display-flex top-margin-30 space-between">
                        <div>
                            <p className="size-pointeight-rem bold">Invite as Admin</p>
                            <p className="size-pointseven-rem light-gray-color">Choose to invite this user as an Administrator</p>
                        </div>
                        <div className="vc-toggle-container right-margin-20">
                            <label className="vc-switch">
                                <input type="checkbox" name="administrator" checked={invite.administrator || false} onChange={onChange} className="vc-switch-input hide" />
                                <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                <span className="vc-handle"></span>
                            </label>
                        </div>
                    </div>
                    <div className="full-width display-flex top-margin-30 space-between">
                        <button type="submit" className="left-padding-30 right-padding-30 height-45 box-shadow-less border-radius-5 display-flex align-items-center">
                            <img src={require(`images/icons/email-send.svg`)} className="height-15" alt="Invite users" />
                            <span className="mustard-color bold size-pointeightfive-rem left-padding-10">INVITE</span>
                        </button>
                        <button type="button" onClick={() => setInvite({})} className="left-padding-30 right-padding-30 height-45 border-mustard border-radius-2 display-flex align-items-center">
                            <img src={require(`images/icons/import.svg`)} className="height-20" alt="Invite users" />
                            <span className="mustard-color bold size-pointeightfive-rem left-padding-10">Upload CSV</span>
                        </button>
                    </div>
                </form>

            </div>
            <div className="height-80 white full-width absolute bottom border-top-lightgray left-padding-80 right-padding-60 border-box display-flex align-items-center space-between">
                <Link to="/dashboard/index">
                    <p className="size-pointnine-rem mustard-color no-select cursor-pointer bold">SKIP</p>
                </Link>
                <button disabled={user.invitingUsers} onClick={sendInvites} className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                    {user.invitingUsers ?
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        :
                        'SAVE'}
                </button>
            </div>
        </>
    )
}

export default InviteUsers;