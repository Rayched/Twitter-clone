
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";
import { CloseBtn, Forms, Headers, Logo_small, MessageBox, SubmitBtn, Wrapper } from "../components/AccountComponents";

interface I_SignInForms {
    EmailInput?: string;
    PasswordInput?: string;
};

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
                Navigate("/home");
            } catch(e){
                alert(e);
            } finally {}
        }
        setValue("EmailInput", "");
        setValue("PasswordInput", "");
    };

    return (
        <Wrapper>
            <Headers>
                <CloseBtn onClick={() => Navigate("/")}>X</CloseBtn>
                <Logo_small />
                <MessageBox>X에 로그인 하세요.</MessageBox>
            </Headers>
            <Forms onSubmit={handleSubmit(FormSubmit)}>
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
                <SubmitBtn>로그인</SubmitBtn>
            </Forms>
            <button onClick={RedirectSignupPage}>회원 가입</button>
        </Wrapper>
    );
};

export default LoginPage;