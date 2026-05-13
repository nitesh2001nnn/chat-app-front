import React from "react";

const LazyChatMainPage = React.lazy(
  () => import("../../src/page/chat-main-page/chat-main-page"),
);

const LazyAuthenticationPreview = React.lazy(
  () => import("../../src/page/authentication/authentication"),
);
const LazyAuthenticationSignup = React.lazy(
  () => import("../../src/page/authentication/signup/signup"),
);

const LazyContactPage = React.lazy(
  () => import("../../src/page/chat-module/contacts/contacts"),
);

const LazyChatWindow = React.lazy(
  () => import("../../src/page/chat-module/chat-window/chat-window"),
);

export {
  LazyChatMainPage,
  LazyAuthenticationPreview,
  LazyContactPage,
  LazyChatWindow,
  LazyAuthenticationSignup,
};
