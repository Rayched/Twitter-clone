import { sign } from "crypto";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";

interface I_SignInForms {
    EmailInput?: string;
    PasswordInput?: string;
};

const LoginWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

const LoginHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
    margin: 5px 0px;
    width: 100%;
    position: relative;
`;

const CloseBtn = styled.div`
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

const MessageBox = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const SignInForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
`;

const SignInDataBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;

    label {
        padding: 0px 3px;
        margin: 0px 5px;
        width: 75px;
        text-align: center;
        font-weight: bold;
        font-size: 17px;
    };
`;
const InputBox = styled.input`
    width: 175px;
    height: 25px;
    border: 2px solid black;
    border-radius: 15px;
    padding: 0px 5px;
`;

const LoginBtn = styled.button`
    width: 180px;
    height: 30px;
    border: 2px solid black;
    border-radius: 15px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 17px;
    background-color: white;

    &:hover {
        background-color: rgb(220, 221, 225);
    }
`;

function LoginPage(){
    const Navigate = useNavigate();
    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors},
        setError
    } = useForm();
    const [isLoading, setLoading] = useState(false);

    const RedirectSignupPage = () => {
        Navigate("/signup");
    };

    const FormSubmit = async({EmailInput, PasswordInput}: I_SignInForms) => {
        if(isLoading || EmailInput === "" || PasswordInput === ""){
            return;
        } else {
            try {
                setLoading(true);
                await signInWithEmailAndPassword(
                    auth, 
                    String(EmailInput), 
                    String(PasswordInput)
                );
                Navigate("/");
            } catch(e){
                alert(e);
            } finally {}
        }
        setValue("EmailInput", "");
        setValue("PasswordInput", "");
    };

    return (
        <LoginWrapper>
            <LoginHeader>
                <CloseBtn>X</CloseBtn>
                <svg width="60" height="50" viewBox="0 0 640 640" fill="#ffffff">
                    <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
                </svg>
                <MessageBox>X에 로그인 하세요.</MessageBox>
            </LoginHeader>
            <SignInForms onSubmit={handleSubmit(FormSubmit)}>
                <SignInDataBox>
                    <label>이메일</label>
                    <InputBox 
                        type="text" 
                        autoComplete="off"
                        {...register("EmailInput")}
                    />
                </SignInDataBox>
                <SignInDataBox>
                    <label>비밀번호</label>
                    <InputBox 
                        type="password" 
                        {...register("PasswordInput")}
                    />
                </SignInDataBox>
                <LoginBtn>로그인</LoginBtn>
            </SignInForms>
            <button onClick={RedirectSignupPage}>회원 가입</button>
        </LoginWrapper>
    );
};

export default LoginPage;