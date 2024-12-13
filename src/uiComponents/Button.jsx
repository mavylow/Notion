export default function Button({ name, onClick, error }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-slate-500 px-4 py-0.5 text-neutral-100 hover:scale-105 transition-transform duration-200 mb-4"
      >
        {name}
      </button>
      <div className="text-red-900">{error}</div>
    </>
  );
}
