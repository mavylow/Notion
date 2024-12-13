// import { useContext } from "react";
// import { UserContext } from "../../authContext/authContext";

import { useSelector } from "react-redux";

export default function About() {
  const { data } = useSelector((state) => state.user);

  return (
    <>
      <div className="font-medium text-xl"> About me </div>
      <div>
        <span className="font-medium"> Email: </span>{" "}
        <span className="text-slate-500">{data.email}</span>
      </div>
      <div>
        <span className="font-medium"> Date sing up: </span>
        <span className="text-slate-500">
          {new Date(data.createdAt).toLocaleString()}
        </span>
      </div>
    </>
  );
}
