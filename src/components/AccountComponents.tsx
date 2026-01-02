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

export const Logo_small = () => {
    return (
        <svg width="60" height="50" viewBox="0 0 640 640" fill="#ffffff">
            <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
        </svg>
    );
};