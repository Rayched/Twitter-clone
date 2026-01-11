import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddImageIcon } from "../../../components/Icons";
import { useEffect, useState } from "react";
import { ImageFileEncoded } from "../../../utils/util";

export interface I_Posts {
    PostText?: string;
    ImageFile?: string;
};

const Wrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(189, 195, 199, 0.4);
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
`;

const Container = styled.div`
    width: 85%;
    max-width: 560px;
    height: 40%;
    max-height: 275px;
    margin-top: 3em;
    background-color: black;
    border-radius: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormHeader = styled.div`
    width: 100%;

    .CloseBtn {
        margin-top: 10px;
        margin-left: 1em;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
    };
`;

const FormBody = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 550px;
    height: 80%;
    margin-top: 5px;
`;

export const PostArea = styled.textarea`
    display: block;
    width: 80%;
    height: 70%;
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    background-color: black;
    resize: none;
    font-family: "NotoSans", "NotoSans-KR";

    &::placeholder {
        color: darkgray;
        font-weight: bold;
    };
`;

export const AddBtnArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin-top: 1em;
`;

export const AddPhotoBtn = styled.label`
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;

    &:hover {
        background-color: rgb(33, 33, 33);
    }
`;

export const AddPhotoInput = styled.input`
    display: none;
`;

export const SubmitBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 40px;
    border-radius: 20px;
`;

export default function AddPostPage(){
    const Navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [Posts, setPosts] = useState<I_Posts>({PostText: "", ImageFile: ""});

    const {
        register, 
        handleSubmit, 
        formState: {dirtyFields}
    } = useForm({mode: "onChange"});

    const PostSubmit = ({PostText, ImageFile}: I_Posts) => {
        if(ImageFile === ""){
            setPosts({
                PostText: PostText,
                ImageFile: ImageFile
            });
        } else {
            setPosts((state) => ({
                PostText: PostText,
                ImageFile: state.ImageFile
            }));
        }
        Navigate("..");
    };

    
    useEffect(() => {
        console.log(Posts);
    }, [Posts.PostText]);

    return (
        <Wrapper>
            <Container>
                <FormHeader>
                    <div className="CloseBtn" onClick={() => Navigate("..")}>X</div>
                </FormHeader>
                <FormBody onSubmit={handleSubmit(PostSubmit)}>
                    <PostArea 
                        placeholder="무슨 일이 일어나고 있나요?"
                        {...register("PostText", {
                            required: true,
                            minLength: {
                                value: 1,
                                message: "최소 한 글자 이상 입력해주세요."
                            }
                        })}
                    />
                    <AddBtnArea>
                        <AddPhotoBtn htmlFor="file">
                            <AddImageIcon w_value={35} h_value={30} />
                            {dirtyFields.ImageFile ? <div>✔</div> : null}
                        </AddPhotoBtn>
                        <AddPhotoInput 
                            id="file" 
                            type="file" 
                            accept="image/*" 
                            {...register("ImageFile", {
                                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                    ImageFileEncoded({
                                        ImageFiles: event.currentTarget.files,
                                        onFileLoad: (filedata) => setPosts((state) => ({
                                            PostText: state.PostText,
                                            ImageFile: filedata
                                        }))
                                    })
                                }
                            })}
                        />
                        <SubmitBtn>게시하기</SubmitBtn>
                    </AddBtnArea>
                </FormBody>
            </Container>
        </Wrapper>
    );
}

/**
 * Post Form Layout 구성
 * - text area
 * - [add photo / add file]___[submit btn]
 * 대략 이런 식으로 form layout 배치할 예정
 * 
 * - 이미지를 추가하면 입력창에 추가한 이미지가 나오게 해야함.
 */