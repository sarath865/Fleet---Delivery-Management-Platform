import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Deliveries from "./pages/Deliveries";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/drivers"
          element={<Drivers />}
        />

        <Route
          path="/vehicles"
          element={<Vehicles />}
        />

        <Route
          path="/deliveries"
          element={<Deliveries />}
        />

        <Route
          path="/tracking"
          element={<Tracking />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;