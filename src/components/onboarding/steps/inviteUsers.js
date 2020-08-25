import React, { useState, useEffect } from 'react'

const InviteUsers = () => {
    const [invite, setInvite] = useState({});
    const [invited, setInvited] = useState([]);

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

    return (
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
                                <p className="size-pointnine-rem bold gray-color">{inviteInstance.fullname}</p>
                                <p className="size-pointeight-rem gray-color">{inviteInstance.email}</p>
                            </div>
                            <div className="display-flex align-items-center" style={{ '--vc-height': '25px', '--vc-width': '50px', '--vc-handle-width': '15px', '--vc-handle-height': '15px' }}>
                                <div class="vc-toggle-container right-margin-20">
                                    <label class="vc-switch">
                                        <input type="checkbox" onChange={e => { let invitedVar = invited; invitedVar[index].administrator = e.target.checked; console.log(invitedVar); setInvited([ ...invitedVar ]); }} checked={inviteInstance.administrator || false} class="vc-switch-input hide" />
                                        <span class="vc-switch-label" data-on="Yes" data-off="No"></span>
                                        <span class="vc-handle"></span>
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
                        <input type="text" name="fullname" onChange={onChange} value={invite.fullname || ""} placeholder="Full Name" required />
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
                    <div class="vc-toggle-container right-margin-20">
                        <label class="vc-switch">
                            <input type="checkbox" name="administrator" checked={invite.administrator || false} onChange={onChange} class="vc-switch-input hide" />
                            <span class="vc-switch-label" data-on="Yes" data-off="No"></span>
                            <span class="vc-handle"></span>
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
    )
}

export default InviteUsers;