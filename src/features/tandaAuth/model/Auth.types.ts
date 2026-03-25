export type FormState = {
    name: string;
    phone: string;
    isFormValid: boolean;
    error: boolean;
    phoneError: boolean;
    nameError: boolean;
    nameTouched: boolean;
    phoneTouched: boolean;
  };
  
  export type AuthHandlers = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhoneChange: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleValidate: () => void;
    handleBlur: (field: 'name' | 'phone') => void;
  };