import { useNavigate } from "react-router-dom";

export default function BackButton({ onClick }) {
  const navigate = useNavigate;
  return (
    <button
      onClick={onClick}
      className="bg-slate-400 px-2 py-1 text-xs text-white w-10"
    >
      Back
    </button>
  );
}
