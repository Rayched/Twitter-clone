import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

/**
 * 로그인 O => "/home"
 * 로그인 X => "/(lobby)"
 */
export default function Lobby(){
    const Navigate = useNavigate();

    return (
        <Wrapper>
            <h4>Hello World</h4>
            <button onClick={() => Navigate("/signup")}>회원 가입</button>
            <button onClick={() => Navigate("/login")}>로그인 하기</button>
        </Wrapper>
    );
};