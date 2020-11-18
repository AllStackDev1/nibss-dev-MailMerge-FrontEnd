import { getColor } from 'helpers/getColor';
import React from 'react'
import Panel from 'styles/styled-components/SignatoriesPanel';
import Draggable from './Draggable';

const SignatoriesPanel = ({ signatories, mouseUp, setSignatoryDragged }) => (
    <Panel>
        <div className="display-flex align-items-center">
            <div className="width-40 height-40 display-flex align-items-center">
                <img src={require(`images/icons/document/signature.svg`)} className="height-18 right-margin-20" alt="NIBSS Signature" />
            </div>
            <span className="size-pointeight-rem">Signature</span>
        </div>
        <div className="display-flex align-items-center">
            <div className="width-40 height-40 display-flex align-items-center">
                <img src={require(`images/icons/document/date.svg`)} className="height-18 right-margin-20" alt="NIBSS Date" />
            </div>
            <span className="size-pointeight-rem">Date Stamp</span>
        </div>
        <div className="display-flex align-items-center bottom-margin-70">
            <div className="width-40 height-40 display-flex align-items-center">
                <img src={require(`images/icons/document/initials.svg`)} className="height-18 right-margin-20" alt="NIBSS Initials" />
            </div>
            <span className="size-pointeight-rem">Initials</span>
        </div>
        <p className="size-pointeight-rem bold">Assigned To</p>
        {signatories.length > 0 ?
            signatories.map((signatory, index) =>
                <div className="top-margin-10 height-50" key={index}>
                    <Draggable mouseUp={mouseUp} user={signatory} setSignatoryDragged={setSignatoryDragged}>
                        <div style={{ backgroundColor: getColor(signatory.name) }} className="height-20 width-20 right-margin-10"></div>
                        <p className="size-pointseven-rem">{signatory.name}</p>
                    </Draggable>
                </div>
            )
            : <i className="top-margin-30 size-pointeight-rem light">No signatories selected</i>}
    </Panel>
)

export default SignatoriesPanel;
