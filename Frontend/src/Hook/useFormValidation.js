const useFormValidation = () => {
  const validate = (values) => {
    const { name, email, password, confirpassword, age } = values;

    const error = {};

    if (!name?.trim()) {
      error.name = "Name is required";
    }

    if (!email?.trim()) {
      error.email = "Email is required";
    }

    if (!password?.trim()) {
      error.password = "Password is required";
    }

    if (!age) {
      error.age = "Age is required";
    }

    // Confirm password
    // if (!confirpassword?.trim()) {
    //   error.confirpassword = "Confirm Password is required";
    // }

    return error;
  };

  return { validate };
};

export default useFormValidation;
