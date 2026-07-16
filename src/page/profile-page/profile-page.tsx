import { useMutation } from "@tanstack/react-query";
import Avatar from "../../common-component/avatar/avatar";
import { profileData } from "./profile-constant/profile-constant";
import "./profile-page.scss";
import { ProfilePhotoUpload } from "./api/api";

const ProfilePage = () => {
  const uploadProfile = (blob: Blob) => {
    console.log("blocb in maijn page", blob);
    const formData = new FormData();

    formData.append("profile", blob);
    console.log("formdata", formData);

    uploadFile.mutate(formData);
  };

  const uploadFile = useMutation({
    mutationKey: ["profile-photo"],
    mutationFn: ProfilePhotoUpload,
    onSuccess: (res: any) => {
      console.log("res getting what", res);
    },
  });
  return (
    <div className="profile-page-container">
      <div className="main-text bold-text-medium">Nitesh Nimje</div>

      <div className="avatar-place">
        <div className="avatar-center">
          <Avatar onCrop={uploadProfile} />
        </div>
      </div>
      {profileData.map((itx: any, index: number) => {
        return (
          <div className="profile-data-container" key={index}>
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
