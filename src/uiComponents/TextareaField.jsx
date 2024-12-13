export default function TextareaField({
  value,
  name,
  placeholder,
  onChange,
  error,
}) {
  return (
    <>
      <textarea
        value={value || ""}
        name={name}
        placeholder={placeholder}
        className="border w-full py-2 pl-2 bg-slate-200 focus:border-slate-400 outline-none resize-none h-32"
        onChange={onChange}
      />
      {error && <div className="text-red-900">{error}</div>}
    </>
  );
}
