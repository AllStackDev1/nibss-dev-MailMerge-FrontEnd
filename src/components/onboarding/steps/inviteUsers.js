import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'actions/userActions';
import { Link } from 'react-router-dom';
import Invite from './snippets/invite';
import InviteForm from './snippets/inviteForm';

const InviteUsers = ({ add }) => {
    const [invite, setInvite] = useState({});
    const [role, setRole] = useState('user');
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

        setInvited(i => ([
            ...i,
            invite
        ]));
    }

    const sendInvites = () => {
        const invitedUsers = invited.map((i, index) => ({ ...i, role }));

        dispatch(userActions.invite(invitedUsers, add));
    }

    return (
        <>
            <div className="left-padding-80 right-padding-80">
                <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Start Inviting Users</p>
                <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">Send invitations to your colleagues and executives</p>
                <div className="height-1 width-150 margin-auto border-top-gray bottom-margin-30"></div>
                {invited.length > 0 &&
                    <div className="bottom-padding-30">
                        <p className="size-onepointtwo-rem bold bottom-padding-10 mid-gray-color">Invited</p>
                        {invited.map((inviteInstance, index) =>
                            <Invite inviteInstance={inviteInstance} key={index} index={index} invited={invited} setInvited={setInvited} />
                        )}
                    </div>}
                <InviteForm 
                    addInvite={addInvite} 
                    invite={invite} 
                    onChange={onChange}
                    role={role} 
                    setRole={setRole} 
                    setInvited={setInvited} />
            </div>
            <div
                className={`height-80 white full-width absolute bottom border-top-lightgray left-padding-80 right-padding-60 border-box display-flex align-items-center 
                            ${add ? 'flex-end' : 'space-between'}`}>
                {!add ?
                    <Link to="/dashboard/index">
                        <p className="size-pointnine-rem mustard-color no-select cursor-pointer bold">SKIP</p>
                    </Link>
                    : ""}
                <button
                    disabled={user?.invitingUsers}
                    onClick={sendInvites}
                    className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center" data-test="save-btn">
                    {user?.invitingUsers ?
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        :
                        'SAVE'}
                </button>
            </div>
        </>
    )
}

export default InviteUsers;
