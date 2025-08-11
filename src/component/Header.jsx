import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { logout } from "../utils/Store/appStore";

const Header = () => {
    const user = useSelector((state) => state.user.user); // ✅ Correct
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth); // 1. Firebase sign-out
            dispatch(logout());  // 2. Redux state clear
            navigate("/")
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    }
    return (

       <div className="absolute w-full px-8 py-4 bg-gradient-to-b from-black flex items-center justify-between z-10">
  {/* Netflix Logo */}
  <img
    className="w-36 md:w-44"
    src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
    alt="Netflix logo"
  />

  {/* User Avatar + Logout Button */}
  <div className="flex items-center gap-4">
    <img
      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white"
      src="https://upload.wikimedia.org/wikipedia/en/7/7e/SHAKTIMAAN.gif?20151210083036"
      alt="User avatar"
    />
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition duration-200"
    >
      Logout
    </button>
  </div>
</div>




    )
}

export default Header;