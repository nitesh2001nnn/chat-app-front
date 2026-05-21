import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  LazyAuthenticationSignup,
  LazyChatMainPage,
  LazyChatWindow,
  LazyContactPage,
  LazyForgotPass,
} from "./lazy-routes";
import OneToOne from "../page/chat-module/one-to-one-chat/one-to-one";
import LoginGuard from "../gaurds/login-gaurd";
import AuthGaurd from "../gaurds/auth-gaurd";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <AuthGaurd element={<LazyChatMainPage />} />,
    children: [
      {
        index: true,
        element: <Navigate to="/chats" replace />,
      },
      {
        path: "chats",
        element: <OneToOne />,
        children: [
          {
            path: ":id",
            element: <LazyChatWindow />,
          },
        ],
      },
      {
        path: "contact",
        element: <LazyContactPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginGuard />,
  },
  {
    path: "signup",
    element: <LazyAuthenticationSignup />,
  },
  {
    path: "forgot-password",
    element: <LazyForgotPass />,
  },
]);
