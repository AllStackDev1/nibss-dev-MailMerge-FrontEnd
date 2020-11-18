import { getColor } from 'helpers/getColor';
import decode from 'jwt-decode';
import React from 'react'

const Trigger = ({signatory, signDocumentConst, index, setModal, user, userToken}) => (
    <div
        onClick={() => setModal(signDocumentConst)}
        key={index}
        className="width-150 height-35 absolute cursor-pointer"
        style={{
            left: signatory.absolute_x_coordinate,
            top: signatory.absolute_y_coordinate,
            backgroundColor: getColor(user?.data?.email || decode(userToken)?.data?.email)
        }}></div>
);

export default Trigger;
