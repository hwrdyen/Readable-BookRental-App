import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>--Header Component--</div>
      <span>
        <Link to="/">Readable</Link>
      </span>
    </div>
  );
};

export default Header;
