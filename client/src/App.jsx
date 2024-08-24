import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import NewPostPage from "./pages/newPost/NewPostPage";
import PostPage from "./pages/post/PostPage";
import AuthenticateLayout from "./pages/authenticate/components/AuthenticateLayout";
import LoginPage from "./pages/authenticate/login/LoginPage";
import SignupPage from "./pages/authenticate/signup/SignupPage";
import ForgotPasswordPage from "./pages/authenticate/ForgotPasswordPage";
import ChangePasswordPage from "./pages/authenticate/ChangePasswordPage";
import AppLayout from "./pages/layout/AppLayout";
import RouteProtector from "./pages/RouteProtector";
import NotFoundPage from "./pages/404";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "anunturi/:urlSlug",
        element: <PostPage />,
      },
      {
        path: "despre-noi",
        element: <AboutPage />,
      },
      {
        path: "termeni-si-conditii",
        element: <TermsAndConditionsPage />,
      },
      {
        // PROTECTED APP
        element: <RouteProtector />,
        children: [
          {
            path: "administrare",
            element: <DashboardPage />, // !! more children pages here
          },
          {
            path: "anunturi/nou",
            element: <NewPostPage />,
          },
        ],
      },
    ],
  },
  {
    // AUTHENTICATION
    element: <AuthenticateLayout />,
    children: [
      {
        path: "cont-nou",
        element: <SignupPage />,
      },
      {
        path: "autentificare",
        element: <LoginPage />,
      },
      {
        path: "am-uitat-parola",
        element: <ForgotPasswordPage />,
      },
      {
        path: "schimba-parola",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  // TODO: urgent add a loading screen
  return <RouterProvider router={router} />;
}
App.displayName = "App";

export default App;
