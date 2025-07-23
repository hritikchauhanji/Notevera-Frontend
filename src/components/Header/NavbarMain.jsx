import React from 'react'
import NavbarLogo from './NavbarLogo'
import ThemeBtn from './ThemeBtn'

function NavbarMain() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md dark:text-white shadow-md border-b border-slate-300 dark:border-slate-700">
            <NavbarLogo />
            <ThemeBtn />
        </div>
    );
}

export default NavbarMain;
