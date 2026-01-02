import styled from "styled-components";
import { CloseBtn, Logo_small } from "../components/AccountComponents";
import { Form, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../FirebaseSetup";

interface I_SubmitBtn {
    isInputTexts: boolean;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;

const Container = styled.div`
    width: 90%;
    max-width: 680px;
    height: 90%;
    max-height: 640px;
    border-radius: 15px;
    color: white;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Headers = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const TextBox = styled.div`
    width: 75%;
    margin-top: 15px;

    .TitleText {
        font-size: 25px;
        font-weight: bold;
    };

    .BodyText {
        font-size: 15px;
        margin-top: 8px;
        color: gray;
    }
`;

const FormBox = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 50%;
`;

const EmailInputs = styled.div`
    width: 90%;
    height: 40px;
    color: white;
    background-color: black;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 3px 0px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
        color: inherit;
        background-color: inherit;
        width: 95%;
        height: inherit;
        border: 0px;
        outline: none;
    };
`;

const SubmitBtn = styled.button<I_SubmitBtn>`
    color: black;
    background-color: ${(props) => props.isInputTexts ? "darkgray": "white"};
    width: 85%;
    height: 35px;
    border-radius: 15px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 18px;
`;

const LinkBox = styled.div`
    color: white;
    background-color: rgb(53, 59, 72);

    width: 350px;
    height: 100px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .TitleText {
        width: 95%;
        margin-top: 8px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .checkbox {
            background-color: white;
            width: 16px;
            height: 16px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5px;
        }
    };

    a {
        color: white;
        text-decoration: none;
        margin-bottom: 10px;
        &:hover {
            text-decoration: underline;
        }
    };
`;

const LoadingBox = styled(LinkBox)`
    justify-content: center;
    font-weight: bold;
    font-size: 17px;
`;

export default function PasswordResetPage(){
    const Navigate = useNavigate();
    const [EmailSends, setEmailSends] = useState(false);
    const [URLText, setURLText] = useState("");
    
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue
    } = useForm({mode: "onChange"});

    const EmailSubmit = async({EmailInput}: {EmailInput?: string}) => {
        try {
            await sendPasswordResetEmail(
                auth, String(EmailInput)
            );
            setEmailSends(true);
            setTimeout(() => {
                setURLText(String(EmailInput?.split("@")[1]));
            }, 1500);
        } catch(e){
            console.log(e);
        };
    };

    useEffect(() => {
        console.log(errors.EmailInput);
        console.log(isValid)
    });

    return (
        <Wrapper>
            <Container>
                <Headers>
                    <CloseBtn onClick={() => Navigate("/")}>X</CloseBtn>
                    <Logo_small />
                </Headers>
                <TextBox>
                    <div className="TitleText">내 X 계정 찾기</div>
                    <div className="BodyText">비밀번호를 변경하려면 계정에 연결된 이메일을 입력해주세요. </div>
                </TextBox>
                <FormBox onSubmit={handleSubmit(EmailSubmit)}>
                    <EmailInputs>
                        <input 
                            type="text" 
                            placeholder="계정과 연결된 이메일을 입력해주세요."
                            autoComplete="off"
                            {...register("EmailInput", {
                                required: true,
                                pattern: {
                                    value: /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "입력하신 이메일을 다시 확인해주세요."
                                }
                            })}
                        />
                    </EmailInputs>
                    <SubmitBtn 
                        disabled={!isValid || errors?.EmailInput !== undefined}
                        isInputTexts={!isValid || errors?.EmailInput !== undefined}
                    >제출하기</SubmitBtn>
                </FormBox>
                {EmailSends && URLText === "" ? <LoadingBox>...Loading</LoadingBox> : null}
                {
                    EmailSends && URLText !== "" ? (
                        <LinkBox>
                            <div className="TitleText">
                                <div className="checkbox">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
                                        <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                                    </svg>
                                </div>
                                비밀번호 초기화 이메일을 전송했습니다.
                            </div>
                            <a href={`https://www.${URLText}/`} target="_blank" onClick={() => Navigate("/login")}>{URLText}로 이동하기</a>
                        </LinkBox>
                    ): null
                }
            </Container>
        </Wrapper>
    );
}