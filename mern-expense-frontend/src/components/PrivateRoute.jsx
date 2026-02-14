// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//   const isLoggedIn = localStorage.getItem("fake_user");

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // ✅ backend token check
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

