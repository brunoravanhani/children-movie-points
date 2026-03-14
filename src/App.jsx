import Router from "./Router.jsx";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
