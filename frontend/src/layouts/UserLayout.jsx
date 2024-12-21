import { Outlet } from "react-router-dom";
import { Header } from "../components/User/UserHeader";

export const UserLayout = () => {
    return (
        <>
            <Header />
                <div className="min-h-96">
                    <Outlet />
                </div>
        </>
    );
};
