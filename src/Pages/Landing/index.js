import { NavLink } from "react-router";

export default function Landing() {
    return (
        <>
            <div>
                <h1>Welcome to Landing</h1>
                <p>This is the Landing component</p>

                <NavLink to="/app">Go to App</NavLink>
            </div>
        </>
    );
}