
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Layout from "./routes/layout";
import Home from "./routes/Home";
import { useEffect, useState } from "react";
import LoadingScreen from "./routes/Loading";
import { auth } from "./FirebaseSetup";
import SignUpPage from "./routes/SignUp";
import LoginPage from "./routes/Login";
import { DefaultProtected, HomeProtected } from "./components/protected-route";
import Lobby from "./routes/Lobby";
import PasswordResetPage from "./routes/PasswordReset";

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
    element: <DefaultProtected><Layout /></DefaultProtected>,
    children: [
      {
        path: "",
        element: <Lobby />
      }
    ]
  },
  {
    path: "/home",
    //element: <Home />,
    element: <HomeProtected><Home /></HomeProtected>
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/password_reset",
    element: <PasswordResetPage />
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