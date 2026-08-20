import { useEffect, useState } from "react";
import TopBreadcrumb from "../../shared/component/top-breadcrumb/top-breadcrumb";
import "./edit-page.scss";
import Modal from "../../../common-component/modal/modal";
import {
  createEditConfig,
  PROFILE_SECTIONS,
} from "./constant/edit-page-constant";
import TextInput from "../../../common-component/inputs/text-input/text-input";
import type { formState } from "../../shared/types/types";
import { validator } from "../../chat-module/constants/one-to-one";
import { useMutation } from "@tanstack/react-query";
import { ProfileDetailsImport } from "../api/api";
interface EditPageProps {
  value: string;
  changeCB: (data: any) => void;
  data: any;
  onCBAPICALL: (item: any) => void;
}

const EditPage = ({ value, changeCB, data, onCBAPICALL }: EditPageProps) => {
  const [modalViewName, setModalViewName] = useState<
    keyof typeof config | null
  >(null);
  const [profileData, setProfileData] = useState({
    about: { value: "", error: "", isTouched: false, isValid: false },
    profileName: { value: "", error: "", isTouched: false, isValid: false },
    email: { value: "", error: "", isTouched: false, isValid: false },
  });

  const [displayProfile, setDisplayProfile] = useState({
    about: "",
    profileName: "",
    email: "",
  });

  useEffect(() => {
    if (!data) return;

    setDisplayProfile({
      about: data.bio,

      profileName: data.fullName ?? "",

      email: data.email ?? "",
    });
  }, [data]);

  const handleClick = (val: string) => {
    console.log("item getting wht", val);
    setModalViewName(val);
  };

  const config: any = createEditConfig(modalViewName, {});

  const activeConfig = modalViewName ? config[modalViewName] : "";

  console.log("active config", activeConfig);

  const validatorFn = (
    field: keyof formState,
    value: string,
    updateFormData: formState,
  ) => {
    return validator[field](value, updateFormData);
  };

  const handleSubmit = () => {
    const stateName = activeConfig.stateName;
    const value = profileData[stateName].value;

    setDisplayProfile((prev) => ({
      ...prev,
      [stateName]: profileData[stateName].value,
    }));

    const fieldMap: any = {
      profileName: "name",
      about: "bio",
      email: "email",
    };

    const backendField = fieldMap[stateName];

    handleSubmitMutation.mutate({
      [backendField]: value,
    });
  };

  const handleBlur = (field: keyof formState) => {
    setProfileData((prev) => {
      const error = validatorFn(field, prev[field].value, prev);
      return {
        ...prev,
        [field]: {
          ...prev[field],
          isTouched: true,
          errorText: error,
          isValid: !error,
        },
      };
    });
  };

  const handleChange = (val: string, fieldName: keyof formState) => {
    setProfileData((prev: any) => {
      const updateValue = {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: val,
        },
      };

      const error = prev[fieldName]?.isTouched
        ? validatorFn(fieldName, val, updateValue)
        : "";
      return {
        ...updateValue,
        [fieldName]: {
          ...updateValue[fieldName],
          error: error,
          isValid: !error,
        },
      };
    });
  };

  const handleSubmitMutation = useMutation({
    mutationKey: ["updateValue"],
    mutationFn: (payload: any) => ProfileDetailsImport(payload),
    onSuccess: (res: any) => {
      console.log("res after success", res);
      if (res.success) {
        setModalViewName(null);
      }
    },
    onError: (err: any) => {
      console.error("error", err);
    },
  });

  useEffect(() => {
    console.log("formstate", profileData);
  }, [profileData]);

  const handleBack = () => {
    changeCB("profile-photo");
  };

  return (
    <div className="edit-page-container">
      <TopBreadcrumb title={"Edit Profile"} handleBack={handleBack} />
      {PROFILE_SECTIONS.map((itx: any, ind: any) => {
        return (
          <div className="about-container">
            <span className="bold-text-medium-xs ">{itx.label}</span>
            <div className="about-txt-edit">
              <div className="about-txt">{displayProfile?.[itx.key]}</div>
              <div className="edit-pencil" onClick={() => handleClick(itx.key)}>
                <img src="/assets/icons/pencil.svg" />
              </div>
            </div>
          </div>
        );
      })}

      {modalViewName && (
        <Modal
          onClose={() => setModalViewName(null)}
          title={activeConfig?.title}
          isOverlayVisible={false}
        >
          <TextInput
            value={profileData[activeConfig?.stateName]?.value}
            errorText={profileData[activeConfig?.stateName]?.error}
            placeholder={activeConfig?.placeholder}
            label={activeConfig?.label}
            onChange={(e) =>
              handleChange(e.target.value.trimStart(), activeConfig?.stateName)
            }
            onBlur={() => handleBlur(activeConfig?.stateName)}
          />
          <button
            className={`secondary-button ${
              !profileData[activeConfig?.stateName]?.isValid ? "disabled" : ""
            }`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
};

export default EditPage;
