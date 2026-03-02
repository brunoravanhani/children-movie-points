import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Pages/Home/index';
import { PrivateRoute } from "./Components/Auth/PrivateRoute";
import Login from "./Pages/Login/index";
import Landing from "./Pages/Landing/index";
import NotFound from "./Pages/NotFound/index";
import { AuthContext } from "./Context/AuthContext";

const Router = () => {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route  path="/app" element={<PrivateRoute token={token} redirectPath="/login" />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}   

export default Router;