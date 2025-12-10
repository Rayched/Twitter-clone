import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";
import { FirebaseError } from "firebase/app";
import { error } from "console";

interface  I_SignupForm {
    username?: string;
    email?: string;
    password?: string;
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
    const {
        register, 
        handleSubmit, 
        setValue, 
        setError,
        formState: {errors}
    } = useForm();
    const [isLoading, setLoading] = useState(false);
    /**
     * useForm의 `setError`, formState 활용한 형태로
     * 컨버전 해볼 것
    */

    const Navigate = useNavigate();

    const FormSubmit = async(data: I_SignupForm) => {
        if(isLoading || data.username === "" || data.email === "" || data.password === ""){
            return;
        }
        try {
            setLoading(true);
            const Credentials = await createUserWithEmailAndPassword(
                auth, 
                String(data.email), 
                String(data.password)
            );
            console.log(Credentials.user);
            await updateProfile(Credentials.user, {
                displayName: data.username
            });
            Navigate("/home");
        } catch(error){
            if(error instanceof FirebaseError){
                setError("email", {
                    type: "manual",
                    message: "중복된 이메일 입니다."
                });
            }
        } finally {
            setLoading(false);
        }
        setValue("username", "");
        setValue("password", "");
        setValue("email", "");
    };

    useEffect(() => console.log(errors), [isLoading]);

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
            <SignupForms onSubmit={handleSubmit(FormSubmit)}>
                <InputBox 
                    type="text" 
                    placeholder="닉네임 (세 글자 이상)"
                    autoComplete="off"
                    {...register(
                        "username", 
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
                        "email", 
                        {
                            required: true,
                            pattern: {
                                value: /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "입력하신 이메일을 다시 확인해주세요."
                            }
                        }
                    )}
                />
                {errors?.email && <div className="errors">{`${errors?.email.message}`}</div>}
                <InputBox 
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호 (최소 6 글자 이상)"
                    {...register(
                        "password",
                        {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6 글자 이상이어야 합니다."
                            }
                        }
                    )}
                />
                {errors?.password?.message && <div className="ErrorBox">{`${errors?.password?.message}`}</div>}
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