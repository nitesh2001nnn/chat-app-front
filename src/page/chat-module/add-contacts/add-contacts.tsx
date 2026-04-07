/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TextInput from "../../../common-component/inputs/text-input/text-input";

import "./add-contacts.scss";
import { validator } from "../constants/one-to-one";



const AddContacts = () => {
  const [formData, setFormData] = useState<formState>({
    fullName: { value: "", isTouched: false, isValid: false, errorText: "" },
    email: { value: "", isTouched: false, isValid: false, errorText: "" },
    phoneNumber: { value: "", isTouched: false, isValid: false, errorText: "" },
  });

  

  const handleChange = (field: keyof formState, value: any) => {
    setFormData((prev) => {
      const error = prev[field].isTouched ? validator[field](value) : "";
      return {
        ...prev,
        [field]: {
          ...prev[field],
          errorText: error,
          value: value,
          isValid: !error,
        },
      };
    });
  };

  const handleBlur = (field: keyof formState) => {
    setFormData((prev) => {
      const error = validator[field](prev[field].value);
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

  return (
    <div className="add-contact-container">
      <TextInput
        label={"Name"}
        value={formData.fullName.value}
        onChange={(e: any) => handleChange("fullName", e.target.value)}
        errorText={formData.fullName.errorText}
        placeholder={"Enter Name"}
        onBlur={() => handleBlur("fullName")}
      />
      <TextInput
        label={"Email"}
        value={formData.email.value}
        onChange={(e: any) => handleChange("email", e.target.value)}
        errorText={formData.email.errorText}
        placeholder={"Enter Email"}
        onBlur={() => handleBlur("email")}
        type={"email"}
      />

      <TextInput
        label={"Phonenumber"}
        value={formData.phoneNumber.value}
        onChange={(e: any) => handleChange("phoneNumber", e.target.value)}
        errorText={formData.phoneNumber.errorText}
        placeholder={"Enter Phone Number"}
        onBlur={() => handleBlur("phoneNumber")}
      />
    </div>
  );
};

export default AddContacts;
