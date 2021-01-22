import React from 'react'

const InviteForm = ({ addInvite, invite, onChange, role, setRole, parseCSV }) => (
    <form onSubmit={addInvite}>
        <div className="full-width display-flex">
            <div className="width-50-percent right-margin-20">
                <input type="text" name="name" onChange={onChange} value={invite?.name || ""} placeholder="Full Name" required />
            </div>
            <div className="width-50-percent">
                <input type="email" name="email" onChange={onChange} value={invite?.email || ""} placeholder="Email Address" required />
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
                    onChange={e => setRole(e.target?.value)}
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
)

export default InviteForm;
