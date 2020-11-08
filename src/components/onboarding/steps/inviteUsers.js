import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'actions/userActions';
import { Link } from 'react-router-dom';

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

        setInvited(invited => ([
            ...invited,
            invite
        ]));
    }

    const sendInvites = () => {
        const invitedUsers = invited.map((i, index) => ({ ...i, role }));

        dispatch(userActions.invite(invitedUsers, add));
    }

    const parseCSV = file => {
        var reader = new FileReader();
        reader.readAsText(file.target.files[0], "UTF-8");

        reader.onload = function (e) {
            var csv = e.target.result;
            var allTextLines = csv.split('\n');

            let invitedArr = [];

            for (const textLine of allTextLines) {
                var data = textLine.split(',');

                var row = {
                    name: data[0].replace(/[\r\n]+/gm, ""),
                    email: data[1].replace(/[\r\n]+/gm, ""),
                    role: data[2].toLowerCase().replace(/[\r\n]+/gm, "")
                };

                if (data[2].toLowerCase().replace(/\s/g, '') === "administrator") {
                    row.administrator = true;
                }

                invitedArr.push(row);
            }

            setInvited(invitedArr);
        }

        file.target.value = null;
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
                        <div className="right-margin-20">
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className="select-role height-30 border-radius-5 no-outline border-gray border-width-2 left-padding-10 right-padding-10">
                                <option value="user">User</option>
                                <option value="administrator">Administrator</option>
                            </select>
                        </div>
                    </div>
                    <div className="full-width display-flex top-margin-30 space-between">
                        <button type="submit" className="left-padding-30 right-padding-30 height-45 box-shadow-less border-radius-5 display-flex align-items-center">
                            <img src={require(`images/icons/email-send.svg`)} className="height-15" alt="Invite users" />
                            <span className="mustard-color bold size-pointeightfive-rem left-padding-10">INVITE</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { document.getElementById('csv_file').click() }}
                            className="left-padding-30 right-padding-30 height-45 border-mustard border-radius-2 display-flex align-items-center">
                            <img src={require(`images/icons/import.svg`)} className="height-20" alt="Invite users" />
                            <span className="mustard-color bold size-pointeightfive-rem left-padding-10">Upload CSV</span>
                        </button>
                        <input type="file" name="csv_file" id="csv_file" accept=".csv" onChange={parseCSV} className="width-0 height-0 border-box hide"></input>
                    </div>
                </form>

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
                    disabled={user.invitingUsers}
                    onClick={sendInvites}
                    className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center">
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
