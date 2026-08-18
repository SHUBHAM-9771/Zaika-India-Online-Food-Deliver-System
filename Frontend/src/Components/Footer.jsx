import "../Style/Footer.css";

import facebook from "../assets/Images/facebook.png";
import twitter from "../assets/Images/twitter.png";
import instagram from "../assets/Images/instagram.png";

const Footer = () => {
  return (
    <footer className="highlight1">
      {/* About */}
      <div className="card1">
        <div className="heading">Zaika India.</div>

        <div className="description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
          minima nostrum sapiente accusamus, voluptates quas cum autem dolor
          maiores harum delectus facere, in, quae itaque aut eligendi nulla
          quisquam voluptatum.
        </div>

        {/* Social Media */}
        <div className="logo">
          <div>
            <img src={facebook} alt="facebook" />
          </div>

          <div>
            <img src={twitter} alt="twitter" />
          </div>

          <div>
            <img src={instagram} alt="instagram" />
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="card2">
        <div className="t1">Company</div>

        <p>Home</p>
        <p>About Us</p>
        <p>Delivery</p>
        <p>Privacy Policy</p>
      </div>

      {/* Contact */}
      <div className="card3">
        <div className="t1">GET IN TOUCH</div>

        <p>+1-212-456-7890</p>
        <p>Zaika@Gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
