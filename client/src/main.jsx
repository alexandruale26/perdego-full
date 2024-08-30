import { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLoader from "./components/AppLoader";

const App = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./App")), 1000);
  });
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<AppLoader />}>
      <App />
    </Suspense>
  </StrictMode>,
);
