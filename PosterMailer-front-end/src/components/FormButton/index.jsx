function FormButton({ type, text, disabled, href, onClick }) {
  return (
    <button
      type={type}
      disabled={disabled}
      href={href}
      onClick={onClick}
      className={`flex items-center justify-center m-auto px-6 py-3 rounded-lg shadow-lg border font-semibold
        ${disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-gray-100 hover:bg-gray-200 duration-200'
        }`}
    >
      {text}
    </button>
  );
}

export default FormButton;
