import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import NewPostPage from "./pages/newPost/NewPostPage";
import AuthenticateLayout from "./pages/authenticate/components/AuthenticateLayout";
import LoginPage from "./pages/authenticate/login/LoginPage";
import SignupPage from "./pages/authenticate/signup/SignupPage";
import ForgotPasswordPage from "./pages/authenticate/ForgotPasswordPage";
import ChangePasswordPage from "./pages/authenticate/ChangePasswordPage";
import AppLayout from "./pages/layout/AppLayout";
import RouteProtector from "./components/RouteProtector";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { AppContext } from "./useAppContext";

import { requestAccessToken } from "./services/api";

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
  const [authenticated, setAuthenticated] = useState(false); // later with a loading indicator or keep is stealthy

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await requestAccessToken();
        // console.log("authenticated");
        if (response.status === "success") setAuthenticated(true);
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  return (
    <AppContext.Provider value={{ authenticated, setAuthenticated }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
App.displayName = "App";

export default App;
