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
import RouteProtector from "./pages/RouteProtector";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

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
  // TODO: urgent add a loading screen
  return <RouterProvider router={router} />;
}
App.displayName = "App";

export default App;
