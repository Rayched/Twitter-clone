
import { Link, useNavigate } from "react-router-dom";
import {styled} from "styled-components";
import { Logo_small, MessageBox } from "../components/AccountComponents";
import GithubLoginBtn from "../components/GithubLoginBtn";

interface I_LinkBoxMessages {
    fontSize: number;
};

const Wrapper = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

const LobbyHeaders = styled.header`
    width: 90%;
    margin-top: 20px;
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
`;

const HeaderMessage = styled.div`
    font-size: 35px;
    font-weight: bold;
`;

const LinkBox = styled.div`
    width: 90%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0px;
`;

const LinkBoxMessages = styled.div<I_LinkBoxMessages>`
    font-weight: bold;
    font-size: ${(props) => `${props.fontSize}px`};
`;

const LinkButton = styled.div`
    width: 350px;
    height: 41px;
    border-radius: 25px;
    color: black;
    background-color: white;
    font-weight: bold;

    margin: 16px 0px;

    a {
        text-decoration: none;
        color: black;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: inherit;

        &:hover {
            background-color: rgb(220, 221, 225);
        }
    }
`;

const SignInButton = styled(LinkButton)`
    background-color: black;
    color: white;
    border: 1px solid darkgray;

    a {
        color: white;
    }
    a:hover {
        background-color: rgb(47, 54, 64);
    }
`;

export default function Lobby(){
    const Navigate = useNavigate();

    return (
        <Wrapper>
            <LobbyHeaders>
                <Logo_small />
                <HeaderMessage>지금 일어나고 있는 일</HeaderMessage>
            </LobbyHeaders>
            <LinkBox>
                <LinkBoxMessages fontSize={20}>지금 가입하세요.</LinkBoxMessages>
                <GithubLoginBtn BtnText="Github 계정으로 가입하기"/>
                <LinkButton>
                    <Link to={"/signup"}>계정 만들기</Link>
                </LinkButton>
            </LinkBox>
            <LinkBox>
                <LinkBoxMessages fontSize={17}>이미 트위터에 가입하셨나요?</LinkBoxMessages>
                <SignInButton>
                    <Link to={"/login"}>로그인</Link>
                </SignInButton>
            </LinkBox>
        </Wrapper>
    );
};

/**
 * 소셜 로그인 추가
 * 
 * - firebase console로 들어가서
 *   
 */