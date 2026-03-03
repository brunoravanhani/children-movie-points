import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

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

          await loginWithBackend(googleToken);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );

  async function loginWithBackend(googleToken) {

    const requestbody = {
      IdToken: googleToken
    };

    const response = await fetch("https://localhost:8080/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestbody)
    });

    const data = await response.json();

    login(data.token);

    navigate('/app', { replace: true });
  }

}