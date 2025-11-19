import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";

const SrkRiderLogo = ({ color = "dark" }) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate('/')} className="relative cursor-pointer">
      <img className="w-8" src={logo} alt="SrkRider logo" />
      <span
        className={`absolute bottom-0 left-5 font-bold text-xl tracking-tight ${
          color === "white" ? "text-white" : "text-gray-800"
        }`}
      >
        SrkRider
      </span>
    </div>
  );
};

export default SrkRiderLogo;