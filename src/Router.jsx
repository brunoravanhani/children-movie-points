import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Pages/Home/index.jsx';
import { PrivateRoute } from "./Components/Auth/PrivateRoute.jsx";
import Login from "./Pages/Login/index.jsx";
import Landing from "./Pages/Landing/index.jsx";
import NotFound from "./Pages/NotFound/index.jsx";
import { AuthContext } from "./Context/AuthContext.jsx";
import Search from "./Pages/Search/Search.jsx";
import Galery from "./Pages/Galery/Galery.jsx";

const Router = () => {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route  path="/app" element={<PrivateRoute token={token} redirectPath="/login" />}>
                    <Route index element={<Home />} />
                    <Route path="galery" element={<Galery />} />
                    <Route path="search" element={<Search />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}   

export default Router;