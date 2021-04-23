import React from 'react'
import Trigger from './Trigger';


// position signature
const Signatures = ({ signatories, signDocumentConst, setModal, index, user, userToken }) => (
    signatories?.map((signatory, i) =>
        signatory.absolute_x_coordinate !== undefined && (parseInt(signatory.page) === index) ?
            <Trigger signatory={signatory} signDocumentConst={signDocumentConst} index={index} setModal={setModal}
                user={user} userToken={userToken} />
            : <div></div>
    )
)

export default Signatures;
