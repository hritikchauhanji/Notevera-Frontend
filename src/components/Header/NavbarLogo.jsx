import { GiNotebook } from "react-icons/gi";

function NavbarLogo() {
    return (
        <div className="flex text-indigo-700 text-4xl font-bold dark:text-white">
            <div>
                <GiNotebook />
            </div>
            <div>
                Notevera
            </div>
        </div>
    )
}

export default NavbarLogo