import React from 'react'
import useTheme from '../../context/Theme/theme';

export default function ThemeBtn() {

    const { themeMode, darkTheme, lightTheme } = useTheme()

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked

        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }


    return (
        <label className="flex items-center cursor-pointer">

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:hidden md:block">
                {themeMode === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
            <div className='relative ml-3'>
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={onChangeBtn}
                    checked={themeMode === "dark"}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </div>

        </label>
    );
}

