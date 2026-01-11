import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../FirebaseSetup";
import { AddBtnArea, AddPhotoBtn, AddPhotoInput, PostArea, SubmitBtn, type I_Posts } from "./childrens/AddPostPage";
import { AddImageIcon } from "../../components/Icons";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 20%;
    padding: 5px 0px;
    margin-top: 1em;
    border: 1px solid darkgray;
    border-left-width: 0px;
    border-right-width: 0px;
`;

const H_PostArea = styled(PostArea)`
    width: 80%;
    height: 50%;
    border-bottom: 1px solid darkgray;
    margin: 4px 0px;
`;

const H_AddBtnArea = styled(AddBtnArea)``;

const H_AddPhotoBtn = styled(AddPhotoBtn)``;

const H_AddFileInput = styled(AddPhotoInput)``;

const H_SubmitBtn = styled(SubmitBtn)``;

export default function Home(){
    const Navigate = useNavigate();
    const {
        register, 
        handleSubmit,
        formState: {dirtyFields},
        setValue
    } = useForm({mode: "onChange"});

    const [Article, setArticle] = useState<I_Posts>();

    const PostSubmit = async({PostText, ImageFile}: I_Posts) => {
        if(PostText === ""){
            return;
        } else {
            await setArticle({
                PostText: PostText,
                ImageFile: ImageFile
            });
        };
    };
    
    useEffect(() => {
        console.log(Article);
    }, [Article]);

    return (
        <Wrapper>
            <PostForm onSubmit={handleSubmit(PostSubmit)}>
                <H_PostArea 
                    placeholder="무슨 일이 일어나고 있나요?" 
                    {...register("PostText", {
                        required: true,
                        minLength: {
                            value: 1,
                            message: "최소 한 글자 이상 입력해주세요."
                        }
                    })}
                />
                <H_AddBtnArea>
                    <H_AddPhotoBtn htmlFor="file">
                        <AddImageIcon w_value={35} h_value={30} />
                        {dirtyFields.ImageFile ? <div>✔</div> : null}
                    </H_AddPhotoBtn>
                    <H_AddFileInput 
                        id="file" 
                        type="file" 
                        accept="image/*"
                        {...register("ImageFile")}
                    />
                    <H_SubmitBtn>게시하기</H_SubmitBtn>
                </H_AddBtnArea>
            </PostForm>
        </Wrapper>
    );
}