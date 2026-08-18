import { Link } from "react-router-dom";
import { useContext } from "react";

import "../Style/About.css";

import { ThemeContext } from "../Context/TheamContext/ThemeContext";

// Food Images
import food_3 from "../assets/Images/food_Litti Chokha.png";
import food_1 from "../assets/Images/food_1.png";
import AmritsariFish from "../assets/Images/food_Amritsari Fish.png";
import food_4 from "../assets/Images/food_4.png";

import dalchawal from "../assets/Images/bih_dal chawal.jpeg";
import food3 from "../assets/Images/food_Amritsari Fish.png";
import food2 from "../assets/Images/ben_Rosogolla.jpeg";

// Social Images
import facebook from "../assets/Images/facebook.png";
import instagram from "../assets/Images/instagram.png";
import twitter from "../assets/Images/twitter.png";

const About = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <section className="hero" id="Home">
      <div className="poster">
        {/* ================= LEFT SECTION ================= */}

        <div className="left">
          {/* Brand */}

          <div className="brand">
            <h1>ZAIKA INDIA</h1>

            <div className="sub">Royal Taste of All States</div>

            <div className="tagline">
              From Kashmir to Kanyakumari — Flavours of India in One App
            </div>
          </div>

          {/* CTA */}

          <div className="cta">
            <Link to="/foodsCart/bihar" className="btn">
              ORDER NOW
            </Link>

            <div className="small-info">
              Authentic regional dishes • Verified local chefs • Doorstep
              delivery
            </div>
          </div>

          {/* Features */}

          <div className="features">
            <div className="featuret">100% Hygienic</div>

            <div className="featuret">Regional Chefs</div>

            <div className="featuret">Express Delivery</div>

            <div className="featuret">Fresh &amp; Tasty</div>
          </div>

          {/* QR */}

          <div className="qr-row">
            <div className="qr">QR</div>

            <div className="download">
              <div style={{ fontWeight: 700 }}>Scan to Order</div>

              <div className="muted">App / Website</div>
            </div>
          </div>

          {/* Social */}

          <div className="socials">
            <Link to="#">
              <img src={facebook} loading="lazy" alt="Facebook" />
            </Link>

            <Link to="#">
              <img src={instagram} loading="lazy" alt="Instagram" />
            </Link>

            <Link to="#">
              <img src={twitter} loading="lazy" alt="Twitter" />
            </Link>

            <div className="socials-t1">Join 10k+ food lovers</div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="right">
          {/* Food Collage */}

          <div className="collage">
            {/* Hero Image - Don't Lazy Load */}
            <div className="big" style={{ background: "#eee" }}>
              <img src={dalchawal} alt="Dal Chawal" />
            </div>

            {/* Lazy Loaded Images */}

            <div className="small">
              <img src={food2} loading="lazy" alt="Rosogolla" />
            </div>

            <div className="small">
              <img src={food3} loading="lazy" alt="Amritsari Fish" />
            </div>
          </div>

          {/* Food Strip */}

          <div className="map-strip" aria-hidden="true">
            <div className="state">
              <img src={food_1} loading="lazy" alt="Punjab Paratha" />
              Paratha
            </div>

            <div className="state">
              <img src={food_4} loading="lazy" alt="Karnataka Dosa" />
              Dosa
            </div>

            <div className="state">
              <img src={AmritsariFish} loading="lazy" alt="Amritsari Fish" />
              Fish
            </div>

            <div className="state">
              <img src={food_3} loading="lazy" alt="Bihar Litti" />
              Litti
            </div>
          </div>

          {/* Footer Note */}

          <div className="footer-note">
            Delivering authentic tastes from every state — Order now and taste
            the diversity of India.
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
