import "./HomePage.scss";
import useToggle from "../../hooks/useToggle";

const HomePage = () => {
  const [isHappy, toggleIsHappy] = useToggle(true);
  return (
    <>
      <div>HomePage</div>
      <div onClick={() => toggleIsHappy()}>{isHappy ? "Happy" : "Sad"}</div>
    </>
  );
};

export default HomePage;
