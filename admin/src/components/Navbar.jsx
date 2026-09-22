import { useNavigate } from "react-router-dom";
import "../Style/Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  function handleStateChange(e) {
    const value = e.target.value;

    if (value) {
      navigate(value);
    }
  }
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="logo.png" alt="ZaikaIndia" />
      </div>

      {/* Menu */}
      <div className="nav-menu">
        {/* State Dropdown */}
        <div className="dropdown">
          <select
            className="State-select"
            onChange={handleStateChange}
            defaultValue=""
          >
            <option value="" disabled>
              addItems
            </option>
            <option value="/state">State</option>
            <option value="/state-food">Statefood</option>
            <option value="/state-food-item">StatefoodItem</option>
          </select>
        </div>

        <div className="dropdown">
          <button onClick={() => navigate("/listItems")}>ListItem</button>
        </div>

        {/* Orders */}
        {/* <NavLink to="/orders">Orders</NavLink> */}
      </div>

      {/* Right side */}
      <button className="signup">Sign Up</button>
    </nav>
  );
};

export default Navbar;
