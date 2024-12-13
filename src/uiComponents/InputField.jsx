const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <>
      <div className="flex flex-col ">
        <input
          name={name || null}
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border py-1 pl-3 bg-slate-200 focus:border-slate-400 outline-none"
        />
      </div>
      {error && <div className="text-red-900">{error}</div>}
    </>
  );
};

export default InputField;
