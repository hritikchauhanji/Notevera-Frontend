const SelectBox = ({
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label className="sr-only" htmlFor={name}>{placeholder}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-2 rounded border border-gray-300 text-gray-500
                    dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    dark:focus:ring-indigo-400 transition duration-150 ease-in-out"
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox;
