
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Layout from "./Routings/layout";
import Home from "./Routings/Home";
import { useEffect, useState } from "react";
import LoadingScreen from "./Routings/Loading";
import { auth } from "./FirebaseSetup";
import SignUpPage from "./Routings/SignUp";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  },
  {
    path: "/signup",
    element: <SignUpPage />
  }
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  
  //const Auth = auth;

  const Init = async() => {
    //Firebase가 준비될 때까지 실행 X
    //await Auth.authStateReady();
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    Init()
  }, []);
  
  
  return (
    <Wrapper>
        {
          isLoading ? <LoadingScreen /> 
          :<RouterProvider router={Routers} />
        }
    </Wrapper>
  );
};

export default App;