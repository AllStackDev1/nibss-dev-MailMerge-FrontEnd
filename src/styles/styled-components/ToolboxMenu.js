import Styled from "styled-components";

const ToolboxMenu = Styled.div`&>div:not(.lds-ring){
    display: none;
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 1;
}
&>div:not(.lds-ring)>div{
    min-width: 200px;
    background: #FFF !important;
    white-space: nowrap;
    padding-right: 25px !important;
}
&:hover>div{
    display: block;
}
&>div:not(.lds-ring)>div>div:hover{
    opacity: 0.5
}
`;

export default ToolboxMenu;
