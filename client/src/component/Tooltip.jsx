
function Tooltip({ children, label }) {
  return (
    <div className="relative group">
      <span className="rounded-md shadow-sm">
        {children}
      </span>
      <div className="absolute w-auto p-2 mt-1 text-sm leading-tight text-gray bg-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-50 transition-all duration-300">
        {label}
      </div>
    </div>
  );
}

export default Tooltip;
