function CurrencySelector({ label, flagUrl, options, selected, onChange }) {
  return (
    <div className="flex flex-col">
      <p className="font-medium">{label}</p>
      <div className="flex items-center gap-2 mt-2 border border-gray-400 rounded px-2 py-1">
        <img src={flagUrl} alt={`${label} Flag`} className="w-10 h-6 object-cover" />
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="border-none outline-none bg-transparent ml-2 w-auto"
        >
          {options.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencySelector;
