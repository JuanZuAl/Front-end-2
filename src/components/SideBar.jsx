import Nav from "./Nav";

function SideBar() {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
            <div className="mb-4">
                <h1 className="text-lg font-bold">Barra de navegación</h1>
            </div>
            <div className="flex-1 mb-4 ">
                <Nav />
            </div>
            <div>
                <p>Beto12zuluaga@gmail.com</p>
            </div>
        </div>
    )
}
export default SideBar;