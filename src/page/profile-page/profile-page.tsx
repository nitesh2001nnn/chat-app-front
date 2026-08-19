import { useMutation, useQuery } from "@tanstack/react-query";
import Avatar from "../../common-component/avatar/avatar";
import { profileData } from "./profile-constant/profile-constant";
import "./profile-page.scss";
import { profilePhotoDataFetching, ProfilePhotoUpload } from "./api/api";
import { useEffect } from "react";
import { API_CONFIG } from "../shared/api-config/api-config";

interface ProfilePageProps {
  value: string;
  changeCB: (data: any, profileData: any) => void;
}

const ProfilePage = (props: ProfilePageProps) => {
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
    },
  });

  const { data: profileDataFetch } = useQuery({
    queryKey: ["fetch-profile-data"],
    queryFn: profilePhotoDataFetching,
  });

  useEffect(() => {
    console.log("res for profile photo", profileDataFetch);
  }, [profileDataFetch]);
  return (
    <div className="profile-page-container">
      <div className="main-text bold-text-medium">Nitesh Nimje</div>

      <div className="avatar-place">
        <div className="avatar-center">
          <Avatar
            onCrop={uploadProfile}
            src={`${API_CONFIG.BaseUrl}/${profileDataFetch?.data?.[0]?.profile_photo}`}
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
