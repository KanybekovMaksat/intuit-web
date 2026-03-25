import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { FormState, AuthHandlers } from "../Auth.types";

const initialFormState: FormState = {
  name: "",
  phone: "",
  isFormValid: false,
  error: false,
  phoneError: false,
  nameError: false,
  nameTouched: false,
  phoneTouched: false,
};

export const useAuthLogic = (): FormState & AuthHandlers => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    setFormState((prev) => ({ ...prev, phone: value }));
  }, []);

  const handleBlur = useCallback((field: "name" | "phone") => {
    setFormState((prev) => ({ ...prev, [`${field}Touched`]: true }));
  }, []);

  const validateForm = useCallback(() => {
    const nameValid = formState.name.trim().length >= 3;
    const phoneValid = matchIsValidTel(formState.phone);

    setFormState((prev) => ({
      ...prev,
      phoneError: !phoneValid && prev.phoneTouched,
      nameError: !nameValid && prev.nameTouched,
      isFormValid: nameValid && phoneValid,
    }));

    return nameValid && phoneValid;
  }, [
    formState.name,
    formState.phone,
    formState.nameTouched,
    formState.phoneTouched,
  ]);

  const handleValidate = useCallback(() => {
    const isValid = validateForm();
    setFormState((prev) => ({ ...prev, error: !isValid }));
  }, [validateForm]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        navigate("/tanda/result");
      } else {
        handleValidate();
      }
    },
    [navigate, validateForm, handleValidate]
  );

  useEffect(() => {
    validateForm();
  }, [formState.name, formState.phone, validateForm]);

  return {
    ...formState,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleValidate,
    handleBlur,
  };
};
