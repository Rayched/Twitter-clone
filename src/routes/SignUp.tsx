import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";

interface  I_SignupForm {
    UserName?: string;
    Email?: string;
    Password?: string;
};

const SignupWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: black;
`;

const SignupHeader = styled.header`
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

const SignupForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
`;

const InputBox = styled.input`
    display: block;
    border-radius: 10px;
    width: 300px;
    height: 45px;
    color: black;
    background-color: white;
    margin: 5px 0px;
`;

const SubmitBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    border-radius: 20px;
    color: black;
    background-color: white;
    font-weight: bold;
    font-size: 18px;
    margin-top: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgb(220, 221, 225);
        
    };
`;

function SignUpPage(){
    const {register, handleSubmit, setValue} = useForm();
    const [isLoading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const onValid = async({UserName, Email, Password}: I_SignupForm) => {
        if(isLoading || UserName === "" || Email === "" || Password === ""){
            return;
        }
        try {
            setLoading(true);
            const Credentials = await createUserWithEmailAndPassword(
                auth, 
                String(Email), 
                String(Password)
            );
            console.log(Credentials.user);
            await updateProfile(Credentials.user, {
                displayName: UserName
            });
            Navigate("/");
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
        setValue("UserName", "");
        setValue("Password", "");
        setValue("Email", "");
    };

    useEffect(() => {
        console.log("test")
    })

    return (
        <SignupWrapper>
            <SignupHeader>
                <CloseBtn>
                    <Link to={"/"}>X</Link>
                </CloseBtn>
                <svg width="60" height="50" viewBox="0 0 640 640" fill="#ffffff">
                    <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
                </svg>
                <MessageBox>계정을 생성하세요</MessageBox>
            </SignupHeader>
            <SignupForms onSubmit={handleSubmit(onValid)}>
                <InputBox 
                    type="text" 
                    placeholder="닉네임 (세 글자 이상)"
                    autoComplete="off"
                    {...register(
                        "UserName", 
                        {
                            required: true,
                            minLength: {
                                value: 3, 
                                message: "최소 3 글자 이상 입력해주세요."
                            }
                        }
                    )}
                />
                <InputBox 
                    type="text" 
                    placeholder="이메일" 
                    autoComplete="off"
                    {...register(
                        "Email", 
                        {
                            required: true,
                            pattern: {
                                value: /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "입력하신 이메일을 다시 확인해주세요."
                            }
                        }
                    )}
                />
                <InputBox 
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호 (최소 6 글자 이상)"
                    {...register(
                        "Password", 
                        {
                            required: true,
                            minLength: 6
                        }
                    )}
                />
                <SubmitBtn>회원 가입</SubmitBtn>
            </SignupForms>
        </SignupWrapper>
    );
};

export default SignUpPage;

/**
 * X (구 twitter logo)
 * 
 */