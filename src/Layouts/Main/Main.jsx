import { Outlet } from "react-router-dom";
import Header from "../../Pages/Header/Header";
import MobileNav from "../../Pages/MobileNav/MobileNav";


const Main = () => {
    return (
        <div>
            <div className="lg:flex  hidden">
                <Header></Header>
                <Outlet></Outlet>
            </div>
            <div className="lg:hidden block">
                <MobileNav></MobileNav>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;