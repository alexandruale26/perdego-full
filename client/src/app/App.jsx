import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/AboutPage";
import DashboardPage from "../pages/DashboardPage";
import NewPostPage from "../pages/newPost/NewPostPage";
import AuthenticateLayout from "../pages/authenticate/components/AuthenticateLayout";
import LoginPage from "../pages/authenticate/login/LoginPage";
import SignupPage from "../pages/authenticate/signup/SignupPage";
import ForgotPasswordPage from "../pages/authenticate/ForgotPasswordPage";
import ChangePasswordPage from "../pages/authenticate/ChangePasswordPage";
import AppLayout from "../pages/layout/AppLayout";
import RouteProtector from "../components/RouteProtector";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import { AppContext } from "./useAppContext";

import { requestAccessToken } from "../services/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
  {
    // AUTHENTICATION
    element: <AuthenticateLayout />,
    children: [
      {
        path: "/cont-nou",
        element: <SignupPage />,
      },
      {
        path: "/autentificare",
        element: <LoginPage />,
      },
      {
        path: "/am-uitat-parola",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/schimba-parola",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    // PROTECTED APP
    element: (
      <AppLayout>
        <RouteProtector />
      </AppLayout>
    ),
    children: [
      {
        path: "/administrare",
        element: <DashboardPage />,
      },
      {
        path: "/anunturi/nou",
        element: <NewPostPage />,
      },
    ],
  },
  {
    path: "/despre-noi",
    element: (
      <AppLayout>
        <AboutPage />
      </AppLayout>
    ),
  },
  {
    path: "/termeni-si-conditii",
    element: (
      <AppLayout>
        <TermsAndConditionsPage />
      </AppLayout>
    ),
  },
]);

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // make this better, ok till now
    const checkAuth = async () => {
      try {
        const isAuth = getIsAuthCookie();
        if (isAuth === "true") {
          return setTimeout(() => {
            setAuthenticated(true);
            setLoading(false);
          }, 500);
        } else if (isAuth === "false") {
          return setTimeout(() => {
            setAuthenticated(false);
            setLoading(false);
          }, 500);
        }

        const response = await requestAccessToken();
        console.log("authenticated from server refresh token");
        if (response.status === "success") {
          setTimeout(() => {
            setAuthenticated(true);
            setIsAuthCookie(true);
            setLoading(false);
          }, 500);
        }
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
        setIsAuthCookie(false);
        setLoading(false);
      }
    };

    if (!authenticated) checkAuth();
    else setLoading(false);
  }, [authenticated]);

  // TODO: urgent add a loading screen
  return (
    <AppContext.Provider value={{ authenticated, setAuthenticated }}>
      {loading ? <div>Loading...</div> : <RouterProvider router={router} />}
    </AppContext.Provider>
  );
}
App.displayName = "App";

export default App;

const setIsAuthCookie = (value) => {
  // const maxAge = 24 * 60 * 60; // ! think of a good duration
  const maxAge = 40;
  document.cookie = `isAuth=${value};max-age=${maxAge};path=/`;
};

const getIsAuthCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; isAuth=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const deleteIsAuthCookie = () => {
  document.cookie = "isAuth=;max-age=0;path=/";
};
