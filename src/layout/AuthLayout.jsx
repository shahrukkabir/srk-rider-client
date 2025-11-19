import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import SrkRiderLogo from "../components/shared/SrkRiderLogo";

const AuthLayout = () => {
  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="px-4">
        <SrkRiderLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1 px-4">
          <img src={authImg} alt="authentication image" />
        </div>
        <div className="flex-1 mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
