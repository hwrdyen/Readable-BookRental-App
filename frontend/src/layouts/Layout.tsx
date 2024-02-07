import "./Layout.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="Layout__Container">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
