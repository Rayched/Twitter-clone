import styled from "styled-components";

const Wrapper = styled.div`
    width: 600px;
    height: 632px;
    border: 2px solid black;
    border-radius: 15px;
    background-color: black;
    display: flex;
    flex-direction: row;
`;

const SideBar = styled.div`
    width: 50px;
    height: 632px;
    border-radius: inherit;
    background-color: inherit;
    color: white;
    display: flex;
    justify-content: center;
`;

const SignupMain = styled.div`
    width: 500px;
    height: 600px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
`;

const SignupHeader = styled.div``;

const LogoBox = styled.div`
    width: inherit;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Message = styled.div`
    font-size: 18px;
    font-weight: bold;
    width: inherit;
    margin-top: 5px;
`;

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function SignUpPage(){
    return (
        <Wrapper>
            <SideBar>X</SideBar>
            <SignupMain>
                <SignupHeader>
                    <LogoBox>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 640 640" fill="#ffffff">
                            <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
                        </svg>
                    </LogoBox>
                    <Message>계정을 생성하세요</Message>
                </SignupHeader>
                <SignupForm>
                    <input type="text" placeholder="이름" />
                    <input type="text" placeholder="이메일" />
                    <input type="password" placeholder="비밀번호" />
                    <button>회원 가입</button>
                </SignupForm>
            </SignupMain>
        </Wrapper>
    );
};

export default SignUpPage;