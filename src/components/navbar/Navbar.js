import { Link } from "react-router-dom";

import { useTheme } from "../../hooks/useTheme";
import Searchbar from "../searchbar/Searchbar";

import "./Navbar.css";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Recipe</h1>
        </Link>

        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
