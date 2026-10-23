import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Address.css";
import { createAddress, getAddresses } from "../services/Addressservice";

const initialForm = {
  fullname: "",
  mobnumber: "",
  address: {
    house: "",
    pincode: "",
    state: "",
    city: "",
    landmark: "",
    area: "",
  },
};
const Address = () => {
  const navigate = useNavigate();
  const [userDetaile, setUserDetails] = useState(initialForm);
  const [saveaddress, setSavedAddresses] = useState([]);
  console.log("Show all SaveAddress", saveaddress);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [Showform, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleUser(e) {
    const { value, name } = e.target;

    if (name === "fullname" || name === "mobnumber") {
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

  async function handleform(e) {
    e.preventDefault();
    // console.log(userDetaile);
    try {
      let response = await createAddress(userDetaile);

      console.log(response);

      let saveaddress = response?.data.data;

      if (!saveaddress?._id) {
        throw new Error("Address save respose main address ID nahi mila");
      }

      setSavedAddresses((prev) => [...prev, saveaddress]);

      setSelectedAddress(saveaddress._id);

      localStorage.setItem("SelectedAddress", JSON.stringify(saveaddress));

      setUserDetails({
        ...initialForm,
        address: { ...initialForm.address },
      });

      setShowForm(false);
    } catch (error) {
      console.log("ERROR:", error);
      console.log("SERVER ERROR:", error.response?.data);
    } finally {
      setSaving(false);
    }
  }

  // Select an existing address
  function handleSelectedAddress(address) {
    setSelectedAddress(address._id);
    console.log(address._id);

    localStorage.setItem("selectedAddress", JSON.stringify(address));
  }

  const fetchAddress = async () => {
    try {
      let response = await getAddresses();

      let addresses = response?.data?.address || [];

      setSavedAddresses(addresses);

      if (addresses.length < 0) {
        setSelectedAddress(addresses[0]._id);

        setShowForm(true);
      }
    } catch (error) {
      console.error("Save address error:", error);
    }
  };

  useState(() => {
    fetchAddress();
  }, []);

  const handleContinue = () => {
    const address = saveaddress.find((item) => {
      return item._id === selectedAddress;
    });

    if (!address) {
      alert("pehle delivery address select karo");
      return;
    }

    localStorage.setItem("selectedAddress", JSON.stringify(address));
    navigate("/payment");
  };
  return (
    <section className="address-section">
      <div className="address-container">
        <div className="address-header">
          <h2>Select a saved address or Add New Address</h2>
          <p>Enter your delivery details</p>
        </div>

        {!Showform && saveaddress.length > 0 && (
          <>
            {saveaddress?.map((address) => (
              <label
                key={address._id}
                className={`address-card ${
                  selectedAddress === address._id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="SelectedAddress"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={() => handleSelectedAddress(address)}
                />

                <div className="address-card-content">
                  <div className="address-card-top">
                    <strong>{address?.fullname}</strong>

                    {selectedAddress === address._id && (
                      <span className="selected-badge">Selected</span>
                    )}
                  </div>

                  <p>{address?.mobnumber}</p>
                  <p>
                    {address?.address?.house}, {address?.address?.area},{" "}
                    {address?.address?.city}, {address?.address?.state} -{" "}
                    {address?.address?.pincode}
                  </p>
                </div>
              </label>
            ))}
            <button
              onClick={() => {
                setShowForm(true);
              }}
            >
              + add new address
            </button>

            <button onClick={handleContinue}>Continue to payment</button>
          </>
        )}

        {Showform && (
          <div className="new-address-form">
            <h3>Add New Address</h3>
            <p>Enter your delivery details.</p>
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
                    name="mobnumber"
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={userDetaile.mobnumber}
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
                    name="address[house]"
                    placeholder="e.g. Flat 203, House 12B"
                    value={userDetaile.address.house}
                    onChange={handleUser}
                  />
                </div>
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
                <div className="address-actions">
                  <button
                    type="button"
                    className="add-address-btn"
                    onClick={() => setShowForm(true)}
                  >
                    + Add New Address
                  </button>

                  <button
                    type="button"
                    className="continue-payment-btn"
                    onClick={handleContinue}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Address;
