import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputBox = ({
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="mb-4 relative">
            <input
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded 
                bg-white text-gray-900 focus:outline-none focus:ring-2 
                focus:ring-indigo-500 dark:bg-gray-700 dark:text-white 
                dark:border-gray-600 dark:focus:ring-indigo-400 autofill:bg-white autofill:text-white dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(55,65,81)] dark:autofill:text-white"
                autoComplete="on"
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    tabIndex={-1}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            )}
        </div>
    );
};

export default InputBox;
