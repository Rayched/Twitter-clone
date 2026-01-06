
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../FirebaseSetup";
import { CloseBtn, Forms, Headers, MessageBox, SubmitBtn, Wrapper } from "../../components/AccountComponents";
import GithubLoginBtn from "../../components/GithubLoginBtn";
import { Logos } from "../../components/Icons";

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

const ErrorBox = styled.div`
    color: black;
    background-color: darkgray;
    padding: 3px 5px;
    margin-top: 5px;
`;

const SignupBox = styled.div`
    text-align: center;
    margin-top: 10px;

    .guideMessage {
        color: gray;
        margin-right: 7px;
    };

    a {
        color: blue;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const PasswordResetBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 15px;
    background-color: black;
    margin-top: 10px;
    margin-bottom: 15px;

    &:hover {
        background-color: rgb(48, 47, 47);
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
                setError("LoginError", {
                    type: "menual",
                    message: "이메일 혹은 비밀번호를 다시 확인해주세요."
                })
            } finally {}
        }
        setValue("EmailInput", "");
        setValue("PasswordInput", "");
    };

    return (
        <Wrapper>
            <Headers>
                <CloseBtn onClick={() => Navigate("/")}>X</CloseBtn>
                <Logos w_value={60} h_value={50}/>
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
                {errors?.LoginError && <ErrorBox>{`${errors?.LoginError?.message}`}</ErrorBox>}
                <PasswordResetBtn onClick={() => Navigate("/password_reset")}>비밀번호를 잊으셨나요?</PasswordResetBtn>
                <SignupBox>
                    <span className="guideMessage">계정이 없으신가요?</span>
                    <Link to={"/signup"}>가입하기</Link>
                </SignupBox>
            </Forms>  
            <GithubLoginBtn BtnText="Github로 로그인하기"/>
        </Wrapper>
    );
};

export default LoginPage;