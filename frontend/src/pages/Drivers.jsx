import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    license_number: "",
    phone_number: "",
    vehicle_id: "",
    is_available: true,
  });

  const fetchDrivers = async () => {
    try {
      const response = await api.get("/drivers/");
      setDrivers(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to load drivers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const driverData = {
      full_name: formData.full_name,
      license_number: formData.license_number,
      phone_number: formData.phone_number,
      vehicle_id: formData.vehicle_id
        ? Number(formData.vehicle_id)
        : null,
      is_available: formData.is_available,
    };

    try {
      await api.post("/drivers/", driverData);

      setSuccess("Driver created successfully.");

      setFormData({
        full_name: "",
        license_number: "",
        phone_number: "",
        vehicle_id: "",
        is_available: true,
      });

      await fetchDrivers();
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to create driver."
      );
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Drivers</h1>

      <h2>Create Driver</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>License Number</label>
          <br />
          <input
            type="text"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Vehicle ID (optional)</label>
          <br />
          <input
            type="number"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        <br />

        <button type="submit">Create Driver</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <hr />

      <h2>Driver List</h2>

      {loading ? (
        <p>Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>License Number</th>
              <th>Phone Number</th>
              <th>Vehicle ID</th>
              <th>Availability</th>
              <th>Active</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.full_name}</td>
                <td>{driver.license_number}</td>
                <td>{driver.phone_number}</td>
                <td>
                  {driver.vehicle_id ?? "Not Assigned"}
                </td>
                <td>
                  {driver.is_available
                    ? "Available"
                    : "Unavailable"}
                </td>
                <td>
                  {driver.is_active ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Drivers;