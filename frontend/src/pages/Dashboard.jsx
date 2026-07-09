import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    total_drivers: 0,
    total_vehicles: 0,
    total_deliveries: 0,
    pending_deliveries: 0,
    in_transit_deliveries: 0,
    completed_deliveries: 0,
    available_drivers: 0,
    available_vehicles: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/analytics/dashboard");
        setAnalytics(response.data);
      } catch (error) {
        setError(
          error.response?.data?.detail ||
            "Failed to load dashboard analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const cardStyle = {
    border: "1px solid #888",
    borderRadius: "10px",
    padding: "20px",
    minWidth: "180px",
    margin: "10px",
  };

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "30px",
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>

      {error && <p>{error}</p>}

      <h2>Fleet Overview</h2>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Total Drivers</h3>
          <h1>{analytics.total_drivers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Vehicles</h3>
          <h1>{analytics.total_vehicles}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Deliveries</h3>
          <h1>{analytics.total_deliveries}</h1>
        </div>
      </div>

      <h2>Delivery Status</h2>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Pending</h3>
          <h1>{analytics.pending_deliveries}</h1>
        </div>

        <div style={cardStyle}>
          <h3>In Transit</h3>
          <h1>{analytics.in_transit_deliveries}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Completed</h3>
          <h1>{analytics.completed_deliveries}</h1>
        </div>
      </div>

      <h2>Availability</h2>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Available Drivers</h3>
          <h1>{analytics.available_drivers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Available Vehicles</h3>
          <h1>{analytics.available_vehicles}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;