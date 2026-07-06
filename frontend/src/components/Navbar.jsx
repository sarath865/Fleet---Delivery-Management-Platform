import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <nav>
      <h2>Fleet Management</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        {" | "}

        <Link to="/drivers">Drivers</Link>
        {" | "}

        <Link to="/vehicles">Vehicles</Link>
        {" | "}

        <Link to="/deliveries">Deliveries</Link>
        {" | "}

        <Link to="/tracking">Tracking</Link>
        {" | "}

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <hr />
    </nav>
  );
}

export default Navbar;