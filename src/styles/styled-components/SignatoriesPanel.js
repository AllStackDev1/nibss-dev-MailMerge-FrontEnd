import Styled from "styled-components";

const SignatoriesPanel = Styled.div`
    position: fixed;
    top: 300px;
    right: 9%;
    height: calc(100vh - 300px);
    overflow-y: auto;
    width: calc(((25 * (80%)) / 100) - 50px);
`;

export default SignatoriesPanel;