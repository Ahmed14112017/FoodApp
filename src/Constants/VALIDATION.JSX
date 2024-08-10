export const Emailvalitaion={
    required:"Email is require",
    pattern:{
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"Invalid email",
    },
}

const PasswordRGX="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

export const Passwordvalitaion={
  required:"Password is require",
  pattern:{
    value: PasswordRGX,
    message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
  },
}