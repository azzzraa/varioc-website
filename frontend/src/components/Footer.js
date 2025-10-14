import React from "react";
import "./Footer.css";
import { Mail, MapPin, Phone } from "lucide-react";

// Footer component for the website
// Contains contact info, location, working hours, and copyright
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Contact info */}
        <div className="footer-contact">
                       <h3>Kontakt</h3>
          <p><Mail size={16} /> info@varioc-welding.si</p>
          <p><Phone size={16} /> +386 40 123 456</p>
          <p><MapPin size={16} /> Ljubljana, Slovenia</p>
        </div>

        {/* Working hours */}
        <div className="footer-hours">
                <h3>Delovni čas</h3>
          <p>Pon-Pet: 08:00 - 18:00</p>
          <p>Sob: 09:00 - 14:00</p>
          <p>Ned: Zaprto</p>
        </div>

        {/* Optional: Social media links */}
        <div className="footer-social">
                   <h3>Sledite nam</h3>
          <p>Facebook / Instagram (coming soon)</p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Varioc Welding | Vse pravice pridržane</p>
      </div>
    </footer>
  );
}

export default Footer;
