import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
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
import PageLoader from "./components/PageLoader";
import NetworkToast from "./components/NetworkToast";
import PostCreatedPage from "./pages/newPost/PostCreatedPage";
import PostsPage from "./pages/homePosts/PostsPage";

const NewPostPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/newPost/NewPostPage")), 800);
  });
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/anunturi",
        element: <PostsPage />,
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
          // !! more children pages here
          {
            path: "administrare",
            element: <DashboardPage />,
          },
          {
            path: "anunturi/nou",
            element: (
              <Suspense fallback={<PageLoader />}>
                <NewPostPage />
              </Suspense>
            ),
          },
          // !! adaug loader sau nu??
          {
            path: "anunturi/creat/:urlSlug",
            element: (
              <Suspense fallback={<PageLoader />}>
                <PostCreatedPage />
              </Suspense>
            ),
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

// TODO: new page with something was gone wrong
const App = () => {
  return (
    <>
      <NetworkToast />
      <RouterProvider router={router} />
    </>
  );
};
App.displayName = "App";

export default App;
