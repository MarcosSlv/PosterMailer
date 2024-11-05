function Input({ type, placeholder, name, onChange, accept, register, validation }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      accept={accept}
      {...register(name, validation)}
      className="flex-1 py-2 px-6 outline-none bg-transparent text-gray-700 placeholder-gray-400 border rounded-lg"
    />);
}

export default Input;