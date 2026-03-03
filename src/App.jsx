import Router from "./Router.jsx";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="305270341511-6l5bs6cv3dm9vqg50d6hfq75lj5d7vqm.apps.googleusercontent.com">
        <Router />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
