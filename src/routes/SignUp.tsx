import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseSetup";
import { FirebaseError } from "firebase/app";
import { error } from "console";
import { CloseBtn, Forms, Headers, Logo_small, MessageBox, SubmitBtn, Wrapper } from "../components/AccountComponents";

interface  I_SignupForm {
    username?: string;
    email?: string;
    password?: string;
};

const InputBox = styled.input`
    display: block;
    border-radius: 10px;
    width: 300px;
    height: 45px;
    color: black;
    background-color: white;
    margin: 5px 0px;
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
        <Wrapper>
            <Headers>
                <CloseBtn>
                    <Link to={"/"}>X</Link>
                </CloseBtn>
                <Logo_small />
                <MessageBox>계정을 생성하세요</MessageBox>
            </Headers>
            <Forms onSubmit={handleSubmit(FormSubmit)}>
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
            </Forms>
        </Wrapper>
    );
};

export default SignUpPage;

/**
 * X (구 twitter logo)
 * 
 */