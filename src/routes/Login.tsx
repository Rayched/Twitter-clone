import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: black;
`;

const LoginHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    margin: 5px 0px;
    font-size: 18px;
    font-weight: bold;
`;

function LoginPage(){
    const Navigate = useNavigate();

    const RedirectSignupPage = () => {
        Navigate("/signup");
    };

    return (
        <LoginWrapper>
            <LoginHeader>
                <h4>Login Page</h4>
                <h4>로그인을 안한 상태일 때 보여주는 페이지</h4>
            </LoginHeader>
            <button onClick={RedirectSignupPage}>회원 가입</button>
        </LoginWrapper>
    );
};

export default LoginPage;