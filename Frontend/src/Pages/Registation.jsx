// import "../Style/SignUp.css";
// import { useContext, useState } from "react";
// import axios from "axios";
// import facebook from "../assets/Images/facebook.png";
// import twitter from "../assets/Images/twitter.png";
// import instagram from "../assets/Images/instagram.png";
// import { useNavigate } from "react-router-dom";
// // import useFormValidation from "../Hook/useFormValidation";
// import { PopupContext } from "../Context/PopupContext/PopoupContext";
// // Step 6: Import the hook

// const Registation = () => {
//   const navigation = useNavigate();
//   // const { validate } = useFormValidation();
//   const { Signup, setSignup, showRegister, setShowRegister } =
//     useContext(PopupContext);

//   const [formdata, setformdata] = useState({
//     name: "",
//     email: "",
//     password: "",
//     // confirpassword: "",
//   });
//   console.log(formdata);
//   // const [errors, setErrors] = useState({
//   //   nameError: "",
//   //   emailError: "",
//   //   passwordError: "",
//   //   // confirpassword: "",
//   // });

//   function handleInput(e) {
//     const { name, value } = e.target;
//     setformdata({
//       ...formdata,
//       [name]: value,
//     });
//   }

//   function handlesubmit(e) {
//     e.preventDefault();

//     // const newData = {
//     //   name: formdata.name,
//     //   email: formdata.email,
//     //   password: formdata.password,
//     //   // confirmpassword: formdata.confirpassword,
//     //   // age: formdata.age,
//     // };

//     // const ValidationError = validate(newData);
//     // setErrors(ValidationError);

//     // try {
//     //   const response = await axios.post(
//     //     "http://localhost:9000/register",
//     //     formdata,
//     //   );
//     //   console.log(error);
//     // } catch (error) {
//     //   console.log(error);
//     // }
//     setformdata({
//       name: "",
//       email: "",
//       password: "",
//       // confirpassword: "",
//     });
//   }

//   return (
//     <div className="popup1">
//       <div className="reg-popup">
//         <div className="popup-content1">
//           <span className="close-btn" onClick={() => setShowRegister(false)}>
//             &times;
//           </span>

//           <h2>Create your account</h2>

//           <p>
//             Already have an account?
//             <span>
//               <button
//                 className="text-btn"
//                 onClick={() => {
//                   setSignup(true);
//                   setShowRegister(false);
//                 }}
//               >
//                 Sign In
//               </button>
//             </span>
//           </p>
//         </div>

//         <div className="link">
//           <img src={facebook} alt="Facebook" />
//           <img src={instagram} alt="Instagram" />
//           <img src={twitter} alt="Twitter" />
//         </div>

//         <form onSubmit={handlesubmit}>
//           <div className="Input">
//             <input
//               type="text"
//               placeholder="First Name"
//               name="name"
//               value={formdata.name}
//               onChange={handleInput}
//             />
//             <p>{errors.name}</p>
//           </div>

//           <div className="Input">
//             <input
//               type="email"
//               placeholder="email@gmail.com"
//               name="email"
//               value={formdata.email}
//               onChange={handleInput}
//             />
//             <p>{errors.email}</p>
//           </div>

//           <div className="Input">
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={formdata.password}
//               onChange={handleInput}
//             />
//             <p>{errors.password}</p>
//           </div>

//           {/* <div className="Input">
//             <input
//               type="number"
//               placeholder="Age"
//               name="age"
//               value={formdata.age}
//               onChange={handleInput}
//             />
//             <p>{errors.age}</p>
//           </div> */}

//           {/* <div className="Input">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="confirpassword"
//               value={formdata.confirpassword}
//               onChange={handleInput}
//             />
//             <p>{errors.confirpassword}</p>
//           </div> */}

//           <button className="reg-log" type="submit">
//             Create Account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registation;
import React from "react";
import "../Style/SignUp.css";
import { useContext, useState } from "react";
import { PopupContext } from "../Context/PopupContext/PopoupContext";
import axios from "axios";
// import facebook from "../assets/Images/facebook.png";
// import twitter from "../assets/Images/twitter.png";
// import instagram from "../assets/Images/instagram.png";

const Registation = () => {
  const { showRegister, setShowRegister } = useContext(PopupContext);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:9000/register",
      userData,
    );

    console.log(response.data);
    console.log(response.data.message);
    alert(response.data.message);

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="popup1">
      <div className="reg-popup">
        <div className="popup-content1">
          <span className="close-btn">&times;</span>

          <h2>Create your account</h2>

          <p>
            Already have an account?
            <span>
              <button className="text-btn">Sign In</button>
            </span>
          </p>
        </div>

        <div className="link">
          {/* <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={twitter} alt="Twitter" /> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="Input">
            <input
              type="text"
              placeholder="First Name"
              name="username"
              value={userData.username}
              onChange={handleInput}
            />
          </div>

          <div className="Input">
            <input
              type="email"
              placeholder="email@gmail.com"
              name="email"
              value={userData.email}
              onChange={handleInput}
            />
          </div>

          <div className="Input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleInput}
            />
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
