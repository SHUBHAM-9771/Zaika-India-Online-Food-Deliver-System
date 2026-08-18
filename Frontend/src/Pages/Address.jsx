import React, { useState } from "react";
import "../Style/Address.css";

const Address = () => {
  const [userDetaile, setUserDetails] = useState({
    fullname: "",
    mbnumber: "",
    address: {
      flatnumber: "",
      apartmentnumber: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  function handleUser(e) {
    const { value, name } = e.target;

    if (name === "fullname" || name === "mbnumber") {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const field = name.split("[")[1].replace("]", "");
      setUserDetails((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    }
  }

  function handleform(e) {
    e.preventDefault();
    console.log(userDetaile);
  }
  return (
    <section className="address-section">
      <div className="address-container">
        <div className="address-header">
          <h2>Add New Address</h2>
          <p>Enter your delivery details</p>
        </div>

        <form className="address-form" onSubmit={handleform}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name"
                name="fullname"
                value={userDetaile.fullname}
                onChange={handleUser}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                type="tel"
                name="mbnumber"
                id="mobile"
                placeholder="Enter mobile number"
                value={userDetaile.mbnumber}
                onChange={handleUser}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="house">House / Flat No. *</label>
              <input
                type="text"
                id="house"
                name="address[flatnumber]"
                placeholder="e.g. Flat 203, House 12B"
                value={userDetaile.address.flatnumber}
                onChange={handleUser}
              />
            </div>

            <div className="form-group">
              <label htmlFor="building">Building / Apartment Name</label>
              <input
                type="text"
                id="building"
                name="address[apartmentnumber]"
                placeholder="e.g. ABC Residency"
                value={userDetaile.address.apartmentnumber}
                onChange={handleUser}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="area">Area / Locality *</label>
              <input
                type="text"
                name="address[area]"
                id="area"
                placeholder="e.g. Sector 62"
                value={userDetaile.address.area}
                onChange={handleUser}
              />
            </div>

            <div className="form-group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="address[landmark]"
                placeholder="e.g. Near Metro Station"
                value={userDetaile.address.landmark}
                onChange={handleUser}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                name="address[city]"
                id="city"
                placeholder="Enter city"
                value={userDetaile.address.city}
                onChange={handleUser}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="address[state]"
                value={userDetaile.address.state}
                onChange={handleUser}
              >
                <option value="">Select State</option>
                <option value="Bihar">Bihar</option>
                <option value="Delhi">Delhi</option>
                <option value="Haryana">Haryana</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                placeholder="Enter pincode"
                name="address[pincode]"
                // maxLength="6"
                value={userDetaile.address.pincode}
                onChange={handleUser}
              />
            </div>

            {/* <div className="form-group">
              <label>Address Type *</label>

              <div className="address-type">
                <label>
                  <input
                    type="radio"
                    name="addressType"
                    value="Home"
                    defaultChecked
                  />
                  Home
                </label>

                <label>
                  <input type="radio" name="addressType" value="Work" />
                  Work
                </label>

                <label>
                  <input type="radio" name="addressType" value="Other" />
                  Other
                </label>
              </div>
            </div> */}
          </div>

          {/* <div className="form-group full-width">
            <label htmlFor="instructions">Delivery Instructions</label>

            <textarea
              id="instructions"
              placeholder="e.g. Call me before delivery..."
              maxLength="120"
            ></textarea>
          </div>

          <div className="default-address">
            <input type="checkbox" id="defaultAddress" />

            <label htmlFor="defaultAddress">Set as default address</label>
          </div> */}

          <button type="submit" className="save-address-btn">
            📍 Save Address
          </button>
        </form>
      </div>
    </section>
  );
};

export default Address;
