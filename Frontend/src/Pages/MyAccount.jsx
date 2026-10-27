 import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PopupContext } from "../Context/PopupContext/PopoupContext";
import "../Style/MyAccount.css";

const menuItems = [
  { id: "profile", label: "My Profile", icon: "👤", path: "/my-account" },
  { id: "orders", label: "My Orders", icon: "📦", path: "/my-account/orders" },
  {
    id: "favourites",
    label: "Favourites",
    icon: "♥",
    path: "/my-account/favourites",
  },
  {
    id: "addresses",
    label: "My Addresses",
    icon: "📍",
    path: "/my-account/addresses",
  },
];

const MyAccount = () => {
  const { user, LogoutUser, setSignup, setShowRegister } =
    useContext(PopupContext);

  const navigate = useNavigate();
  const location = useLocation();

  const userName =
    typeof user === "string"
      ? user
      : user?.name || user?.username || "Food Lover";

  const userEmail = typeof user === "object" && user ? user.email || "" : "";

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName,
    email: userEmail,
    phone: user?.phone || "",
  });

  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: userName,
    phone: "",
    house: "",
    area: "",
    city: "",
    pincode: "",
  });

  const currentPath = location.pathname;

  const activeSection = currentPath.endsWith("/orders")
    ? "orders"
    : currentPath.endsWith("/favourites")
      ? "favourites"
      : currentPath.endsWith("/addresses")
        ? "addresses"
        : "profile";

  const currentItem =
    menuItems.find((item) => item.id === activeSection) || menuItems[0];

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    setAddresses((previous) => [
      ...previous,
      { ...addressForm, id: Date.now() },
    ]);
    setAddressForm({
      fullName: profile.name,
      phone: "",
      house: "",
      area: "",
      city: "",
      pincode: "",
    });
    setShowAddressForm(false);
  };

  const handleLogout = () => {
    LogoutUser();
    setSignup(false);
    setShowRegister(false);
    navigate("/");
  };

  return (
    <main className="za-account">
      <div className="za-account-heading">
        <div>
          <span className="za-eyebrow">ZAIKA INDIA / ACCOUNT</span>
          <h1>My Account</h1>
          <p>Good food, great memories. Manage everything in one place.</p>
        </div>
        <div className="za-heading-icon">✦</div>
      </div>

      <div className="za-account-layout">
        <aside className="za-sidebar">
          <div className="za-user-card">
            <div className="za-avatar">
              {(profile.name || "F").charAt(0).toUpperCase()}
            </div>
            <div className="za-user-details">
              <strong>{profile.name || "Food Lover"}</strong>
              <span>{profile.email || "Welcome to Zaika India"}</span>
              <small>YOUR ACCOUNT</small>
            </div>
          </div>

          <p className="za-menu-label">ACCOUNT MENU</p>

          <nav className="za-side-nav">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={
                  activeSection === item.id
                    ? "za-side-link active"
                    : "za-side-link"
                }
                onClick={() => navigate(item.path)}
              >
                <span className="za-side-icon">{item.icon}</span>
                <span>{item.label}</span>
                <span className="za-side-arrow">›</span>
              </button>
            ))}
          </nav>

          <div className="za-sidebar-help">
            <span>🍽️</span>
            <strong>Hungry already?</strong>
            <p>Find your next favourite meal.</p>
            <button type="button" onClick={() => navigate("/menu")}>
              Explore menu →
            </button>
          </div>

          <button type="button" className="za-logout" onClick={handleLogout}>
            <span>↪</span> Log out
          </button>
        </aside>

        <section className="za-content">
          <div className="za-content-top">
            <div>
              <span className="za-content-kicker">YOUR ACCOUNT</span>
              <h2>{currentItem.label}</h2>
              <p>
                {activeSection === "profile" &&
                  "Your personal details, all in one place."}
                {activeSection === "orders" &&
                  "Keep track of your delicious food journeys."}
                {activeSection === "favourites" &&
                  "The dishes you love, together in one place."}
                {activeSection === "addresses" &&
                  "Make your next delivery quick and easy."}
              </p>
            </div>
            <span className="za-content-symbol">{currentItem.icon}</span>
          </div>

          {activeSection === "profile" && (
            <div className="za-panel">
              <div className="za-panel-heading">
                <div>
                  <h3>Personal information</h3>
                  <p>Update the details associated with your account.</p>
                </div>
                {!editing && (
                  <button
                    type="button"
                    className="za-outline-btn"
                    onClick={() => setEditing(true)}
                  >
                    ✎ Edit profile
                  </button>
                )}
              </div>

              {editing ? (
                <form className="za-form" onSubmit={handleProfileSave}>
                  <label>
                    Full name
                    <input
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                    />
                  </label>
                  <div className="za-form-actions">
                    <button className="za-primary-btn" type="submit">
                      Save changes
                    </button>
                    <button
                      className="za-cancel-btn"
                      type="button"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="za-profile-grid">
                  <div className="za-detail">
                    <span>FULL NAME</span>
                    <strong>{profile.name || "Not added yet"}</strong>
                  </div>
                  <div className="za-detail">
                    <span>EMAIL ADDRESS</span>
                    <strong>{profile.email || "Not added yet"}</strong>
                  </div>
                  <div className="za-detail">
                    <span>PHONE NUMBER</span>
                    <strong>{profile.phone || "Not added yet"}</strong>
                  </div>
                </div>
              )}

              <div className="za-tip">
                <span>💡</span>
                <p>
                  Keep your contact information updated for a smoother
                  experience.
                </p>
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div className="za-empty">
              <div className="za-empty-art">🛍️</div>
              <span className="za-empty-label">YOUR FOOD JOURNEY</span>
              <h3>No orders just yet</h3>
              <p>
                Your delicious discoveries and past orders will appear here.
              </p>
              <button
                className="za-primary-btn"
                onClick={() => navigate("/menu")}
              >
                Explore the menu →
              </button>
            </div>
          )}

          {activeSection === "favourites" && (
            <div className="za-empty">
              <div className="za-empty-art">♡</div>
              <span className="za-empty-label">MADE WITH LOVE</span>
              <h3>Your favourites live here</h3>
              <p>Save the dishes you love so they're easy to find next time.</p>
              <button
                className="za-primary-btn"
                onClick={() => navigate("/menu")}
              >
                Find favourite dishes →
              </button>
            </div>
          )}

          {activeSection === "addresses" && (
            <>
              <div className="za-panel">
                <div className="za-panel-heading">
                  <div>
                    <h3>Saved addresses</h3>
                    <p>Choose where your next meal should arrive.</p>
                  </div>
                  {!showAddressForm && (
                    <button
                      className="za-primary-btn"
                      onClick={() => setShowAddressForm(true)}
                    >
                      + Add address
                    </button>
                  )}
                </div>

                {showAddressForm && (
                  <form className="za-form" onSubmit={handleAddressSave}>
                    <label>
                      Full name
                      <input
                        name="fullName"
                        value={addressForm.fullName}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        type="tel"
                        value={addressForm.phone}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <label>
                      House / Flat
                      <input
                        name="house"
                        value={addressForm.house}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <label>
                      Area / Street
                      <input
                        name="area"
                        value={addressForm.area}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <label>
                      City
                      <input
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <label>
                      PIN code
                      <input
                        name="pincode"
                        inputMode="numeric"
                        value={addressForm.pincode}
                        onChange={handleAddressChange}
                        required
                      />
                    </label>
                    <div className="za-form-actions">
                      <button className="za-primary-btn" type="submit">
                        Save address
                      </button>
                      <button
                        className="za-cancel-btn"
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {addresses.length === 0 && !showAddressForm && (
                  <div className="za-address-empty">
                    <span>📍</span>
                    <h3>No saved addresses</h3>
                    <p>Add your home or work address for easy delivery.</p>
                  </div>
                )}

                <div className="za-address-list">
                  {addresses.map((address) => (
                    <div className="za-address-card" key={address.id}>
                      <div className="za-address-pin">⌂</div>
                      <div className="za-address-text">
                        <strong>{address.fullName}</strong>
                        <p>
                          {address.house}, {address.area}, {address.city} -{" "}
                          {address.pincode}
                        </p>
                        <span>{address.phone}</span>
                      </div>
                      <button
                        className="za-delete-btn"
                        onClick={() =>
                          setAddresses((prev) =>
                            prev.filter((item) => item.id !== address.id),
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyAccount;
