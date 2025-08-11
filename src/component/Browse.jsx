import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { logout } from "../utils/Store/appStore";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Browse = () => {
   
    return (
        <div>    <Header />


            {/* {user ? (
                <p>{user.email} is logged in here</p>
            ) : (
                <p>No user is logged in</p>
            )} */}

            

        </div>

    );
};

export default Browse;
