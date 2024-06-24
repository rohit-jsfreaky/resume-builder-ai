import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./Home/Home.jsx";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import {thunk} from "redux-thunk"; // Import thunk correctly
import reducers from "./reducers";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path : "/my-resume/:resumeId/view",
    element : <ViewResume/>
  }
]);

const store = createStore(reducers, compose(applyMiddleware(thunk))); // Apply thunk as middleware

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </React.StrictMode>
  </Provider>
);
