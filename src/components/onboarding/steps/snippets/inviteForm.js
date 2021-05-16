import React from 'react'
import validator from 'validator';

const InviteForm = ({ addInvite, invite, onChange, role, setRole, parseCSV }) =>{
    const [isValid, setEmailVaild] = React.useState(true);
    const ref = React.useRef(null)

    const checkEmailValidity = (e) => {
        if(validator.isEmail(e.target.value)){
            setEmailVaild(true)
        }else{
            setEmailVaild(false)
        }
    }

    return (
    <form onSubmit={addInvite}>
        <div className="full-width display-flex">
            <div className="width-50-percent right-margin-20">
                <input type="text" name="name" onChange={onChange} value={invite?.name || ""} placeholder="Full Name" required />
            </div>
            <div className="width-50-percent">
                <input type="email" data-test='email-input' name="email" style={{borderColor: isValid ? '': '#f82e2e'}} onChange={onChange} onBlur={checkEmailValidity} value={invite?.email || ""} placeholder="Email Address" required />
                {!isValid && <p data-test='error-text' className="size-pointseven-rem red-color">Provide a valid email</p>}
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
            <div>
                <button
                    type="button"
                    // onClick={() => document.getElementById('csv_file').click()}
                    onClick={() => ref.current.click()}
                    data-test='upload-csv-button'
                    className="left-padding-30 right-padding-30 height-45 border-mustard border-radius-2 display-flex align-items-center">
                    <img src={require(`images/icons/import.svg`)} className="height-20" alt="Invite users" />
                    <span className="mustard-color bold size-pointeightfive-rem left-padding-10">Upload CSV</span>
                </button>
                <a href="/users-template.csv" className="size-pointeight-rem" download>Download Template</a>
            </div>
            <input type="file" name="csv_file" ref={ref} data-test='upload-csv-input' accept=".csv" onChange={parseCSV} className="width-0 height-0 border-box hide"></input>
        </div>
    </form>
)}

export default InviteForm;
