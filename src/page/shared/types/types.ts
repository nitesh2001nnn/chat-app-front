export type FieldState = {
    value: string;
    isTouched: boolean;
    isValid: boolean;
    errorText: string;
};



export type formState = {
    fullName?: FieldState;
    email?: FieldState;
    phoneNumber?: FieldState;
    remember?: { isChecked: boolean };
    passWord?: FieldState;
    confPassword?: FieldState;
};