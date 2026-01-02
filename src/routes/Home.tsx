import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";

const Wrapper = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

export default function Home(){
    const Navigate = useNavigate();
    
    const Logout = () => {
        auth.signOut();
        alert("로그아웃");
        Navigate("/");
    };
    
    return (
        <Wrapper>
            <h4>Home</h4>
            <button onClick={Logout}>로그아웃</button>
        </Wrapper>
    );
}