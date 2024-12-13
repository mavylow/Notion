import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Footer from "../../uiComponents/Footer";

export default function HomePage() {
  const { data: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("currentPage");
    dispatch({ type: "LOG_OUT_USER" });
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full px-4 ">
        <div> Hello,{user?.login} </div>
        <nav className="flex gap-4">
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? "underline" : ""
            }
          >
            {" "}
            About
          </NavLink>
          <NavLink
            to="notes"
            className={({ isActive }) =>
              isActive ? "underline" : ""
            }
          >
            {" "}
            Notes
          </NavLink>
          <div onClick={handleLogOut}>Log Out</div>
        </nav>
      </div>
      <main className="flex flex-col justify-center items-center gap-2 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
