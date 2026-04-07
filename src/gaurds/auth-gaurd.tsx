import { getLocalStorageObjDetails } from "../page/shared/helper/helper";
import { Navigate } from "react-router-dom";
import { LazyAuthenticationPreview } from "../routes/lazy-routes";
import { Suspense } from "react";

interface AuthGuardProps {
  element: React.ReactNode;
}

const AuthGaurd = ({ element }: AuthGuardProps) => {
  const isLoginToken = JSON.parse(getLocalStorageObjDetails("userData"))?.token;

  if (!isLoginToken) {
    return (
      <>
        <Suspense>
          <Navigate to="/login"> </Navigate>
          <LazyAuthenticationPreview />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense>{element}</Suspense>
      </>
    );
  }
};

export default AuthGaurd;
