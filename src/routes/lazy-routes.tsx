import React from "react";

const LazyChatMainPage = React.lazy(
  () => import("../../src/page/chat-main-page/chat-main-page"),
);

const LazyAuthenticationPreview = React.lazy(
  () =>
    import("../../src/page/authentication/login/switch-login-screen/switch-login-screen"),
);
const LazyAuthenticationSignup = React.lazy(
  () =>
    import("../../src/page/authentication/signup/switch-signup/switch-signup-flow"),
);

const LazyContactPage = React.lazy(
  () => import("../../src/page/chat-module/contacts/contacts"),
);

const LazyChatWindow = React.lazy(
  () => import("../../src/page/chat-module/chat-window/chat-window"),
);

const LazyForgotPass = React.lazy(
  () =>
    import("../page/authentication/forgot-pass/switch-forgot-pass-screen/switch-forgot-pass"),
);

const LazyResetPass = React.lazy(
  () =>
    import("../page/authentication/forgot-pass/password-reset/password-reset"),
);

export {
  LazyChatMainPage,
  LazyAuthenticationPreview,
  LazyContactPage,
  LazyChatWindow,
  LazyAuthenticationSignup,
  LazyForgotPass,
  LazyResetPass,
};
