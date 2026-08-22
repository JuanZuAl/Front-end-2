
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

function LayoutDePrueba() {
    return (
        <div className="prueba min-h-screen flex">
             <Sidebar/>
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-800 text-white py-4 px-6">
                    <h1>Sistema de Gestion de Cursos</h1>
                </div>
                <div className="flex-1">
                    <h1>medio</h1>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default LayoutDePrueba;