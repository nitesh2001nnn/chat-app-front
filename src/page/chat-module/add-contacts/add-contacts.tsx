/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../common-component/inputs/text-input/text-input";

import "./add-contacts.scss";
import { validator } from "../constants/one-to-one";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AddContact } from "./api/add-contact-services";

interface addContactsProps {
  onClose: () => void;
}

const AddContacts = ({ onClose }: addContactsProps) => {
  const [formData, setFormData] = useState<formState>({
    fullName: { value: "", isTouched: false, isValid: false, errorText: "" },
    email: { value: "", isTouched: false, isValid: false, errorText: "" },
    phoneNumber: { value: "", isTouched: false, isValid: false, errorText: "" },
  });

  const queryClient = useQueryClient();

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

  const payload = useMemo(
    () => ({
      name: formData.fullName.value,
      email: formData.email.value,
      phoneNumber: formData.phoneNumber.value,
    }),
    [formData],
  );

  const handleAddContact = () => {
    addContact.mutate(payload);
  };

  const addContact = useMutation({
    mutationKey: ["add-contact"],
    mutationFn: AddContact,
    onSuccess: (res: any) => {
      console.log("res after getting true", res);

      queryClient.invalidateQueries({
        queryKey: ["fetch-contact"],
        refetchType: "all",
      });
      onClose();
    },
  });

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
      <div className="btn-container">
        <button className="primary-button" onClick={onClose}>
          Cancel
        </button>
        <button className="secondary-button" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default AddContacts;
