import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 text-center">
      <h1 className="text-2xl font-bold"><Link to="/">Inventory Management</Link></h1>
    </header>
  );
};

export default Header;