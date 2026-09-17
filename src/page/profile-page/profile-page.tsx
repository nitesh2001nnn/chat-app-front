import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Avatar from "../../common-component/avatar/avatar";
import { profileData } from "./profile-constant/profile-constant";
import "./profile-page.scss";
import { profilePhotoDataFetching, ProfilePhotoUpload } from "./api/api";
import { useEffect } from "react";
import { API_CONFIG } from "../shared/api-config/api-config";
import { useGlobalContext } from "../../global/hooks/useGlobalContext";
import { getProfileImageUrl } from "../shared/helper/helper";

interface ProfilePageProps {
  value: string;
  changeCB: (data: any, profileData: any) => void;
}

const ProfilePage = (props: ProfilePageProps) => {
  const queryClient = useQueryClient();

  const { setProfileData, refreshProfileData } = useGlobalContext();

  const uploadProfile = (blob: Blob) => {
    const formData = new FormData();
    formData.append("profile", blob, "profile.jpg");

    uploadFile.mutate(formData);
  };

  const handleChangeScreen = (value: string, data: any) => {
    props.changeCB(value, data);
  };

  const uploadFile = useMutation({
    mutationKey: ["profile-photo"],
    mutationFn: ProfilePhotoUpload,
    onSuccess: (res: any) => {
      console.log("res getting what", res);
      queryClient.invalidateQueries({ queryKey: ["fetch-profile-data"] });
      refreshProfileData?.();
    },
  });

  const { data: profileDataFetch } = useQuery({
    queryKey: ["fetch-profile-data"],
    queryFn: profilePhotoDataFetching,
  });

  // Safely extract user object whether backend returns array or object
  const userProfile = Array.isArray(profileDataFetch?.data)
    ? profileDataFetch.data[0]
    : profileDataFetch?.data || profileDataFetch?.result?.[0] || profileDataFetch?.result;

  const rawPhoto = userProfile?.profile_photo || userProfile?.profilePhoto;
  const avatarSrc = getProfileImageUrl(rawPhoto);
  const displayName = userProfile?.fullName || userProfile?.name || userProfile?.display_name || "Profile";

  useEffect(() => {
    if (profileDataFetch) {
      setProfileData(profileDataFetch);
    }
  }, [profileDataFetch, setProfileData]);

  useEffect(() => {
    console.log("res for profile photo", profileDataFetch, "resolved avatarSrc:", avatarSrc);
  }, [profileDataFetch, avatarSrc]);

  return (
    <div className="profile-page-container">
      <div className="main-text bold-text-medium">{displayName}</div>

      <div className="avatar-place">
        <div className="avatar-center">
          <Avatar
            onCrop={uploadProfile}
            src={avatarSrc}
          />
        </div>
      </div>
      {profileData.map((itx: any, index: number) => {
        return (
          <div
            className="profile-data-container"
            key={index}
            onClick={() => handleChangeScreen(itx.value, profileDataFetch)}
          >
            <img src={itx.icon} />
            <div className="side-label-container">
              <div className="bold-text-medium-xxs">{itx.label}</div>
              <div className="lower-container">
                {itx?.subLabels?.map((item: string, ind: number) => {
                  return (
                    <span className="text-body-xs lower-text">{item}, </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className="logout-container">
        <img src="/assets/icons/logout-24.png" />
        <span className="bold-text-medium-xs">Logout</span>
      </div>
    </div>
  );
};

export default ProfilePage;
