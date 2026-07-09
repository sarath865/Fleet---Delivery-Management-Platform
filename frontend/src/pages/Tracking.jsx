import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Tracking() {
  const [deliveryId, setDeliveryId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [trackingHistory, setTrackingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchTrackingHistory = async () => {
    if (!deliveryId) {
      setError("Please enter a delivery ID.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.get(
        `/tracking/${deliveryId}`
      );

      setTrackingHistory(response.data);
    } catch (error) {
      setTrackingHistory([]);

      setError(
        error.response?.data?.detail ||
          "Failed to load tracking history."
      );
    } finally {
      setLoading(false);
    }
  };

  const addTrackingLocation = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!deliveryId) {
      setError("Please enter a delivery ID.");
      return;
    }

    try {
      const trackingData = {
        delivery_id: Number(deliveryId),
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      await api.post("/tracking/", trackingData);

      setMessage("Tracking location added successfully.");

      setLatitude("");
      setLongitude("");

      const response = await api.get(
        `/tracking/${deliveryId}`
      );

      setTrackingHistory(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to add tracking location."
      );
    }
  };

  const mapPositions = trackingHistory.map((tracking) => [
    tracking.latitude,
    tracking.longitude,
  ]);

  const latestLocation =
    trackingHistory.length > 0
      ? trackingHistory[trackingHistory.length - 1]
      : null;

  return (
    <div>
      <Navbar />

      <h1>Delivery Tracking</h1>

      <h2>Add Tracking Location</h2>

      <form onSubmit={addTrackingLocation}>
        <div>
          <label>Delivery ID</label>
          <br />
          <input
            type="number"
            value={deliveryId}
            onChange={(event) =>
              setDeliveryId(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Latitude</label>
          <br />
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(event) =>
              setLatitude(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Longitude</label>
          <br />
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(event) =>
              setLongitude(event.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">Add Location</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <hr />

      <h2>Tracking History</h2>

      <button onClick={fetchTrackingHistory}>
        Load Tracking History
      </button>

      <br />
      <br />

      {loading && <p>Loading tracking history...</p>}

      {!loading &&
        !error &&
        trackingHistory.length === 0 && (
          <p>No tracking history loaded.</p>
        )}

      {trackingHistory.length > 0 && (
        <>
          <h2>Delivery Map</h2>

          <MapContainer
            key={`${deliveryId}-${trackingHistory.length}`}
            center={[
              latestLocation.latitude,
              latestLocation.longitude,
            ]}
            zoom={13}
            style={{
              height: "450px",
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trackingHistory.map((tracking) => (
              <Marker
                key={tracking.id}
                position={[
                  tracking.latitude,
                  tracking.longitude,
                ]}
              >
                <Popup>
                  Delivery ID: {tracking.delivery_id}
                  <br />
                  Latitude: {tracking.latitude}
                  <br />
                  Longitude: {tracking.longitude}
                </Popup>
              </Marker>
            ))}

            {mapPositions.length > 1 && (
              <Polyline positions={mapPositions} />
            )}
          </MapContainer>

          <br />

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
        </>
      )}
    </div>
  );
}

export default Tracking;
