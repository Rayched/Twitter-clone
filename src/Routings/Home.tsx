import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

const CreateAccountBtn = styled.div`
    width: 150px;
    height: 40px;
    background-color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    a {
        text-decoration: none;
        color: black;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    };

    &:hover {
        background-color: rgb(220, 221, 225);
    };
`;

export default function Home(){
    return (
        <Wrapper>
            <h4>Home</h4>
            <CreateAccountBtn>
                <Link to={"/signup"}>계정 만들기</Link>
            </CreateAccountBtn>
        </Wrapper>
    );
}