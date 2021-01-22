import React from 'react'

const Invite = ({ inviteInstance, invited, setInvited, index }) => (
    <div key={index} className="invited full-width display-flex space-between top-padding-10">
        <div>
            <p className="size-pointnine-rem bold gray-color">{inviteInstance?.name}</p>
            <p className="size-pointeight-rem gray-color">{inviteInstance?.email}</p>
        </div>
        <div
            className="display-flex align-items-center"
            style={{ '--vc-height': '25px', '--vc-width': '50px', '--vc-handle-width': '15px', '--vc-handle-height': '15px' }}>
            {inviteInstance?.administrator &&
                <span className="size-pointeight-rem mustard-color bold right-margin-10">Administrator</span>}
            <img
                src={require(`images/icons/bin.svg`)}
                onClick={() => setInvited(invited?.filter((_, i) => i !== index))}
                className="height-18 cursor-pointer" alt="Invite users" />
        </div>
    </div>
)

export default Invite;
