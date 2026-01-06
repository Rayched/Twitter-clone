import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

export const Headers = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
    margin: 5px 0px;
    width: 100%;
    position: relative;
`;

export const CloseBtn = styled.div`
    width: 60px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5px;
    left: 0px;
    font-size: 18px;
    font-weight: bold;

    a {
        text-decoration: none;
        color: inherit;
    };
`;

export const MessageBox = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const Forms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
`;

export const SubmitBtn = styled.button`
    width: 180px;
    height: 30px;
    border: 2px solid black;
    border-radius: 15px;
    background-color: white;
    font-weight: bold;
    font-size: 17px;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
        background-color: rgb(220, 221, 225);
    };
`;