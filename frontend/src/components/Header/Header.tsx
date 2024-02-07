import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header__Container">
      <Link to="/" className="Header__Icon">
        Readable
      </Link>
      <div className="Header__NavBar--container">
        <Link to="#" className="Header__NavBar--title">
          About
        </Link>
        <Link to="#" className="Header__NavBar--title">
          Feature
        </Link>
      </div>
      <div className="Header__Auth--container">
        {<div className="Header__Auth--title">Sign In</div>}
      </div>
    </div>
  );
};

export default Header;
