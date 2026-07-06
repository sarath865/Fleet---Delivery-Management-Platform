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

  return (
    <div>
      <Navbar />

      {loading ? (
        <h2>Loading dashboard...</h2>
      ) : (
        <>
          <h1>Dashboard</h1>

          {error && <p>{error}</p>}

          <h2>Fleet Overview</h2>

          <div>
            <h3>Total Drivers</h3>
            <p>{analytics.total_drivers}</p>
          </div>

          <div>
            <h3>Total Vehicles</h3>
            <p>{analytics.total_vehicles}</p>
          </div>

          <div>
            <h3>Total Deliveries</h3>
            <p>{analytics.total_deliveries}</p>
          </div>

          <h2>Delivery Status</h2>

          <div>
            <h3>Pending</h3>
            <p>{analytics.pending_deliveries}</p>
          </div>

          <div>
            <h3>In Transit</h3>
            <p>{analytics.in_transit_deliveries}</p>
          </div>

          <div>
            <h3>Completed</h3>
            <p>{analytics.completed_deliveries}</p>
          </div>

          <h2>Availability</h2>

          <div>
            <h3>Available Drivers</h3>
            <p>{analytics.available_drivers}</p>
          </div>

          <div>
            <h3>Available Vehicles</h3>
            <p>{analytics.available_vehicles}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;