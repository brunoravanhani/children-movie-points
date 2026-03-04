import Router from "./Router.jsx";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="">
        <Router />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
