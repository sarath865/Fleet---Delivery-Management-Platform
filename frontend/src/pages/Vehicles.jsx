import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    vehicle_number: "",
    vehicle_type: "",
    capacity: "",
    fuel_type: "",
    status: "Available",
  });

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicles/");
      setVehicles(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to load vehicles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const vehicleData = {
      vehicle_number: formData.vehicle_number,
      vehicle_type: formData.vehicle_type,
      capacity: Number(formData.capacity),
      fuel_type: formData.fuel_type,
      status: formData.status,
    };

    try {
      await api.post("/vehicles/", vehicleData);

      setSuccess("Vehicle created successfully.");

      setFormData({
        vehicle_number: "",
        vehicle_type: "",
        capacity: "",
        fuel_type: "",
        status: "Available",
      });

      await fetchVehicles();
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to create vehicle."
      );
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Vehicles</h1>

      <h2>Create Vehicle</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Number</label>
          <br />
          <input
            type="text"
            name="vehicle_number"
            value={formData.vehicle_number}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Vehicle Type</label>
          <br />
          <input
            type="text"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Capacity</label>
          <br />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Fuel Type</label>
          <br />
          <input
            type="text"
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Status</label>
          <br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <br />

        <button type="submit">Create Vehicle</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <hr />

      <h2>Vehicle List</h2>

      {loading ? (
        <p>Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Fuel Type</th>
              <th>Status</th>
              <th>Active</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.vehicle_number}</td>
                <td>{vehicle.vehicle_type}</td>
                <td>{vehicle.capacity}</td>
                <td>{vehicle.fuel_type}</td>
                <td>{vehicle.status}</td>
                <td>
                  {vehicle.is_active ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Vehicles;