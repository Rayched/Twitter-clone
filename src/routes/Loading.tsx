import styled from "styled-components";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Text = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export default function LoadingScreen(){
    return (
        <Wrapper>
            <Text>Loading...</Text>
        </Wrapper>
    );
};