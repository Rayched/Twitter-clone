import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 17px;
    font-weight: bold;
    margin: 5px 0px;
  }
`;

function App() {
  return (
    <Wrapper>
      <h3>Hello Vite</h3>
      <p>
        기존의 CRA 사용하지 않고 <br/>
        Vite 사용해서 만든 <br/>
        React Project 입니다.
      </p>
    </Wrapper>
  );
}

export default App
