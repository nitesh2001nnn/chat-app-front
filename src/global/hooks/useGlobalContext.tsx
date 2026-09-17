import { createContext, useContext, useEffect, useState } from "react";
import { profilePhotoDataFetching } from "../../page/profile-page/api/api";
import { getLocalStorageObjDetails } from "../../page/shared/helper/helper";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: any) => {
  // Only states that should be globally available
  const [profileData, setProfileData] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshProfileData = async () => {
    try {
      const res = await profilePhotoDataFetching();
      setProfileData(res);
      return res;
    } catch (err) {
      console.error("Error fetching global profile data:", err);
    }
  };

  useEffect(() => {
    const raw = getLocalStorageObjDetails("userData");
    const parsed = raw && typeof raw === "string" ? JSON.parse(raw) : raw;

    if (parsed?.token) {
      setUserData(parsed);
      setToken(parsed.token);
      setIsLoggedIn(true);
      refreshProfileData();
    }
  }, []);

  console.log("use context for global", profileData);

  return (
    <GlobalContext.Provider
      value={{
        profileData,
        setProfileData,
        refreshProfileData,

        userData,
        setUserData,

        token,
        setToken,

        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }

  return context;
};
