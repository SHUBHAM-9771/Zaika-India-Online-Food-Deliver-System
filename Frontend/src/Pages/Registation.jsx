import "../Style/SignUp.css";
import { useContext, useState } from "react";
import facebook from "../assets/Images/facebook.png";
import twitter from "../assets/Images/twitter.png";
import instagram from "../assets/Images/instagram.png";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hook/useFormValidation";
import { PopupContext } from "../Context/PopupContext/PopoupContext";
// Step 6: Import the hook

const Registation = () => {
  const navigation = useNavigate();
  const { validate } = useFormValidation();
  const { Signup, setSignup, showRegister, setShowRegister } =
    useContext(PopupContext);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirpassword: "",
    age: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirpassword: "",
    age: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    // console.log(`${name} : ${value}`);
    setformdata({
      ...formdata,
      [name]: value,
    });
  }

  function handlesubmit(e) {
    e.preventDefault();

    const newData = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      confirmpassword: formdata.confirpassword,
      age: formdata.age,
    };

    const ValidationError = validate(newData);
    setErrors(ValidationError);

    setformdata({
      name: "",
      email: "",
      password: "",
      confirpassword: "",
      age: "",
    });
  }

  return (
    <div className="popup1">
      <div className="reg-popup">
        <div className="popup-content1">
          <span className="close-btn" onClick={() => setShowRegister(false)}>
            &times;
          </span>

          <h2>Create your account</h2>

          <p>
            Already have an account?
            <span>
              <button
                className="text-btn"
                onClick={() => {
                  setSignup(true);
                  setShowRegister(false);
                }}
              >
                Sign In
              </button>
            </span>
          </p>
        </div>

        <div className="link">
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={twitter} alt="Twitter" />
        </div>

        <form onSubmit={handlesubmit}>
          <div className="Input">
            <input
              type="text"
              placeholder="First Name"
              name="name"
              value={formdata.name}
              onChange={handleInput}
            />
            <p>{errors.name}</p>
          </div>

          <div className="Input">
            <input
              type="email"
              placeholder="email@gmail.com"
              name="email"
              value={formdata.email}
              onChange={handleInput}
            />
            <p>{errors.email}</p>
          </div>

          <div className="Input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formdata.password}
              onChange={handleInput}
            />
            <p>{errors.password}</p>
          </div>

          <div className="Input">
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formdata.age}
              onChange={handleInput}
            />
            <p>{errors.age}</p>
          </div>

          <div className="Input">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirpassword"
              value={formdata.confirpassword}
              onChange={handleInput}
            />
            <p>{errors.confirpassword}</p>
          </div>

          <button className="reg-log" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registation;
