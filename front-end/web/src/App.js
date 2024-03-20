import { useEffect, useState } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import AssignmentView from "./AssignmentView";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import PrivateRoute from "./PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);

      return decodedJwt.authorities;
    }
    return [];
  }

  // Ensure roles are updated whenever jwt changes
  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [jwt]);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles && roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
