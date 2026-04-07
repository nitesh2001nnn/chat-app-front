import { Suspense } from "react";
import { getLocalStorageObjDetails } from "../page/shared/helper/helper";
import {
  LazyAuthenticationPreview,
  LazyChatMainPage,
} from "../routes/lazy-routes";
import { Navigate } from "react-router-dom";

const LoginGuard = () => {
  const isLoginToken = JSON.parse(getLocalStorageObjDetails("userData"))?.token;
  console.log("islogintoek", isLoginToken);

  if (isLoginToken) {
    return (
      <>
        <Suspense>
          <Navigate to="/"></Navigate>
          <LazyChatMainPage />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense>
          <LazyAuthenticationPreview />
        </Suspense>
      </>
    );
  }
};
export default LoginGuard;
