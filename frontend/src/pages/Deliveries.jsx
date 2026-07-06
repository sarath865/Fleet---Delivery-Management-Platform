import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    order_number: "",
    customer_name: "",
    pickup_address: "",
    delivery_address: "",
    package_weight: "",
    priority: "Normal",
    scheduled_time: "",
    driver_id: "",
    vehicle_id: "",
  });

  const fetchDeliveries = async () => {
    try {
      const response = await api.get("/deliveries/");
      setDeliveries(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to load deliveries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
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
    setMessage("");

    try {
      const deliveryData = {
        ...formData,
        package_weight: Number(formData.package_weight),
        driver_id: Number(formData.driver_id),
        vehicle_id: Number(formData.vehicle_id),
      };

      await api.post("/deliveries/", deliveryData);

      setMessage("Delivery created successfully.");

      setFormData({
        order_number: "",
        customer_name: "",
        pickup_address: "",
        delivery_address: "",
        package_weight: "",
        priority: "Normal",
        scheduled_time: "",
        driver_id: "",
        vehicle_id: "",
      });

      fetchDeliveries();
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to create delivery."
      );
    }
  };

  const updateDeliveryStatus = async (
    deliveryId,
    newStatus
  ) => {
    setError("");
    setMessage("");

    try {
      await api.put(`/deliveries/${deliveryId}`, {
        status: newStatus,
      });

      setMessage(
        `Delivery status updated to ${newStatus}.`
      );

      fetchDeliveries();
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Failed to update delivery status."
      );
    }
  };

  if (loading) {
    return <h2>Loading deliveries...</h2>;
  }

  return (
    <div>
      <Navbar />

      <h1>Deliveries</h1>

      <h2>Create Delivery</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Order Number</label>
          <br />
          <input
            type="text"
            name="order_number"
            value={formData.order_number}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Pickup Address</label>
          <br />
          <input
            type="text"
            name="pickup_address"
            value={formData.pickup_address}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Delivery Address</label>
          <br />
          <input
            type="text"
            name="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Package Weight</label>
          <br />
          <input
            type="number"
            step="0.01"
            name="package_weight"
            value={formData.package_weight}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        <br />

        <div>
          <label>Scheduled Time</label>
          <br />
          <input
            type="datetime-local"
            name="scheduled_time"
            value={formData.scheduled_time}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Driver ID</label>
          <br />
          <input
            type="number"
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Vehicle ID</label>
          <br />
          <input
            type="number"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Delivery
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <hr />

      <h2>Delivery List</h2>

      {deliveries.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Weight</th>
              <th>Priority</th>
              <th>Scheduled Time</th>
              <th>Driver ID</th>
              <th>Vehicle ID</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.order_number}</td>
                <td>{delivery.customer_name}</td>
                <td>{delivery.pickup_address}</td>
                <td>{delivery.delivery_address}</td>
                <td>{delivery.package_weight}</td>
                <td>{delivery.priority}</td>
                <td>{delivery.scheduled_time}</td>
                <td>{delivery.driver_id}</td>
                <td>{delivery.vehicle_id}</td>
                <td>{delivery.status}</td>

                <td>
                  <select
                    value={delivery.status}
                    onChange={(event) =>
                      updateDeliveryStatus(
                        delivery.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>
                    <option value="In Transit">
                      In Transit
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Deliveries;