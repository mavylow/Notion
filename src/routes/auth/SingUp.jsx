import { z } from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../../uiComponents/Footer";
import InputField from "../../uiComponents/InputField";
import { UserSignUp } from "../../validation/zodConst";
import Button from "../../uiComponents/Button";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateUser = async () => {
    try {
      const user = UserSignUp.parse({
        login,
        email,
        password,
        confirmPassword,
      });

      setErrors(null);

      const response = await fetch(
        "http://localhost:5138/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: user.login,
            email: user.email,
            password: user.password,
            createdAt: Date.now(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newUser = await response.json();
      dispatch({ type: "LOAD_USER", payload: newUser });

      navigate("/about");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };

  return (
    <>
      <main className="min-h-[85vh] flex flex-col justify-center items-center gap-2 ">
        <div className="font-semibold">Sign Up</div>
        <div className="text-xs">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-600 underline"
          >
            Log In
          </Link>
        </div>
        <InputField
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          error={errors?.login?._errors[0]}
        />
        <InputField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email?._errors[0]}
        />
        <InputField
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors?.password?._errors[0]}
        />
        <InputField
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          error={errors?.confirmPassword?._errors[0]}
        />
        <Button name="Sign Up" onClick={validateUser} />
      </main>
      <hr></hr>
      <Footer />
    </>
  );
}
