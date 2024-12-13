import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../uiComponents/Footer";
import InputField from "../../uiComponents/InputField";
import {
  UserEmail,
  UserLogin,
} from "../../validation/zodConst";
import Button from "../../uiComponents/Button";
// import { UserContext } from "../../authContext/authContext";

export default function Login() {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  // const userContext = useContext(UserContext);
  const location = useLocation();
  const handleLogin = () => {
    try {
      loginOrEmail.includes("@")
        ? UserEmail.parse({
            email: loginOrEmail,
            password,
          })
        : UserLogin.parse({
            login: loginOrEmail,
            password,
          });

      const query = loginOrEmail.includes("@")
        ? new URLSearchParams({
            email: loginOrEmail,
          })
        : new URLSearchParams({
            login: loginOrEmail,
          });
      setErrors(null);
      fetch(`http://localhost:5138/users?${query}`)
        .then((res) => res.json())
        .then((users) => users[0])
        .then((user) => {
          if (!user) {
            setErrors({
              notFound: "User not found. Please sign up.",
            });
            return;
          }

          if (user.password !== password) {
            setErrors({
              wrongPassword:
                "Incorrect password. Please try again.",
            });
            return;
          }

          dispatch({ type: "LOAD_USER", payload: user });
          const from = location.state?.from || "/about";
          navigate(from, { replace: true });
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      } else {
        setErrors({
          error: "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <main className="min-h-[85vh] flex flex-col justify-center items-center gap-2 ">
        <div className="font-semibold"> Log In </div>
        <div className="text-xs">
          New user?{" "}
          <Link
            to="/signup"
            className="text-sky-600 underline"
          >
            Create an account
          </Link>
        </div>

        <InputField
          placeholder="Login"
          value={loginOrEmail}
          onChange={(e) => setLoginOrEmail(e.target.value)}
          error={errors?.login?._errors[0]}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors?.password?._errors[0]}
        />
        <Button
          name="Log In"
          onClick={handleLogin}
          error={errors?.notFound || errors?.wrongPassword}
        />
      </main>
      <hr></hr>
      <Footer />
    </>
  );
}
