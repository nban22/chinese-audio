import { Form } from "react-router-dom";
import styled from "styled-components";

export const StyledAuthPage = styled.div`
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    background: #feac5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #4bc0c8,
        #c779d0,
        #feac5e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #4bc0c8,
        #c779d0,
        #feac5e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /* background-image: url("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        inset: 0;
        backdrop-filter: blur(3px);
        z-index: -2;
    }

    & > * {
        width: clamp(350px, 90%, 600px);
        backdrop-filter: blur(40px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
`;

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    width: clamp(350px, 80%, 800px);
`;

export const Header = styled.div`
    width: 100%;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    h2 {
        margin: 0;
        font-size: 2rem;
        color: #333;
        text-shadow: 0 0 10px #fff;
    }
`;

export const Input = styled.input`
    color: #1b1b1b;
    background-color: transparent;
    width: 100%;
    box-shadow: 0 0 0px 2px #00000087 inset;
    outline: none;
    border: none;
    padding: 10px 40px;
    border-radius: 50px;
    height: 50px;
    margin-block: 10px;
    text-align: center;
    font-size: 1.1rem;
    &:focus {
        box-shadow: 0 0 0px 2px #000000b8 inset, 0 0 10px 2px #4a4a4a70;
    }
    &::placeholder {
        color: #303030a3;
    }
`;

export const SubmitButton = styled.button`
    background: #feac5e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #4bc0c8,
        #c779d0,
        #feac5e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to left,
        #4bc0c8,
        #c779d0,
        #feac5e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    padding: 10px;
    border-radius: 50px;
    margin-block: 10px;
    height: 50px;
    cursor: pointer;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0px 2px #00000087;
    transition: all 200ms ease;
    &:hover {
        filter: contrast(150%);
        transform: scale(1.1);
    }
`;
