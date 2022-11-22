import { Login, Dashboard } from "./pages";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
