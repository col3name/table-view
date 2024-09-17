import styled from "styled-components";

export const DeleteButton = styled.button`
    opacity: 0;
    border-radius: 8px;
    padding: 10px 12px 10px 12px;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${(props) => props.disabled ? '#FEE3E3' : '#FED7D7'};
    }

    &:hover path {
        fill: ${(props) => props.disabled ? '#C53030' : '#9B2C2C'};
    }
`;