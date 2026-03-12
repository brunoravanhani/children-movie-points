import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { loginWithGoogle } from "../../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div>
      <h1>Login com Google</h1>

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const googleToken = credentialResponse.credential;

          const data = await loginWithGoogle(googleToken);
          login(data.token);
          navigate("/app", { replace: true });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );

}
