import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    
  })
  return (
    <>
      <h2>{authHeader()}</h2>
      <button
      onClick={() => navigate("/catalogues")}
      >go to catalogues</button>
    </>
  );
}

export { Dashboard };
