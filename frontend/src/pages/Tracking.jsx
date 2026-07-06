import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Tracking() {
  const [deliveryId, setDeliveryId] = useState("");
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrackingHistory = async () => {
    if (!deliveryId) {
      setError("Please enter a delivery ID.");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingHistory([]);

    try {
      const response = await api.get(
        `/tracking/${deliveryId}`
      );

      setTrackingHistory(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to load tracking history."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Delivery Tracking</h1>

      <div>
        <label>Delivery ID</label>
        <br />

        <input
          type="number"
          value={deliveryId}
          onChange={(event) =>
            setDeliveryId(event.target.value)
          }
          placeholder="Enter delivery ID"
        />

        <button onClick={fetchTrackingHistory}>
          Track Delivery
        </button>
      </div>

      <br />

      {loading && <p>Loading tracking history...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        trackingHistory.length === 0 &&
        deliveryId && <p>No tracking history found.</p>}

      {trackingHistory.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Delivery ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Recorded At</th>
            </tr>
          </thead>

          <tbody>
            {trackingHistory.map((tracking) => (
              <tr key={tracking.id}>
                <td>{tracking.id}</td>
                <td>{tracking.delivery_id}</td>
                <td>{tracking.latitude}</td>
                <td>{tracking.longitude}</td>
                <td>{tracking.recorded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tracking;
