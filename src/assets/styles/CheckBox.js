import styled from "styled-components";

const CheckBox = styled.button`
width: 30px;
height: 30px;
font-size: 20px;
margin-right: 4px;
border-radius: 5px;
border: 1px solid #D4D4D4;
color: ${props => props.checked ? 'white' : '#DBDBDB'};
background-color: ${props => props.checked ? '#CFCFCF' : 'white'};
`;

export default CheckBox;