import { useEffect, useState } from "react";
import { Footer, HeroGradient, NavbarMain } from "./components";
import { ThemeProvider } from "./context/Theme/theme";
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

function App() {
  const [themeMode, setThemeMode] = useState('dark');
  const location = useLocation();

  const darkTheme = () => setThemeMode('dark');
  const lightTheme = () => setThemeMode('light');

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  // 🔍 Define paths where you want to hide the navbar
  const hideNavbar = location.pathname.startsWith('/dashboard/notes/');

  const showFooter = ['/', '/auth/login', '/auth/register'].includes(location.pathname);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <main className="font-body">
        {!hideNavbar && <NavbarMain />}
        <Outlet />
        <HeroGradient />
        {showFooter && <Footer />}

        <ToastContainer
          toastClassName="bg-slate-900 text-white border border-indigo-500"
          bodyClassName="text-sm"
          progressClassName="bg-indigo-600"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
